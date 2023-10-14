# wanted-pre-onboarding-backend

다양한 기업의 기술과제를 수행하는 교육형 인턴십 '원티드 프리온보딩 백엔드 인턴쉽'에 참여하기 위한 사전과제 레포지토리입니다.

---

## 코딩 컨벤션

- 디렉토리 및 파일 이름은 nest의 기본 컨벤션(케밥케이스)을 사용하였습니다. 아키텍처가 복잡해질 경우 카멜 케이스 보다 케밥 케이스의 가독성이 좋다고 판단했습니다.

- 함수와 변수의 이름은 카멜 케이스를, 인터페이스, 생성자, 타입, Enum의 변수명은 파스칼 케이스, 상수(constant)는 대문자 스네이크 케이스를 사용하였습니다.

- 변수명이 길더라도 명확한 의미 전달을 위해 약어를 사용하지 않았습니다.

---

## 커밋 컨벤션

---

## 프로젝트 구성

### Stack

- Typescript, Nest.js(Express), TypeORM(MySQL), Jest

### Class Diagram

---

## 기능목록

### 1. 채용공고 등록

#### 기능구현

[dto]

- request를 통해 받은 데이터를 비즈니스 로직에 맞게 검증, 변형하는 책임을 위임하고 dto의 불변성을 지키기 위해 setter 사용을 지양하였습니다.

- dto의 값 검증을 위한 상수 검증 class(array-contains-constants.validator.ts)를 custom하였습니다.

[entity]

- orm entity 내부에 비즈니스 로직을 구현하여 비즈니스 로직이 다른 로직에 의존하지 않도록 하였습니다.

[service]

- service는 entity의 비즈니스 로직과 repository에 의존하며, 트랜잭션을 관리합니다. 채용공고 등록
  기능에서는 큰 역할을 하지 않습니다.

#### 채용공고 data

> - 필수 사항 : 공고명(title), 직군(jobGroup)/직무(job), 회사명(companyName), 경력(experienceYears), 근무지 좌표계(coordinate), 근무지 주소(province/city) 공고 서론(introduction), 자격요건(qualifications), 혜택 및 복지(benefits), 주요 업무(tasks), 공고 시작일(startDate), 공고 마감일(endDate), 채용 공고의 상태(status)
> - 선택 사항 : 우대사항(preferenceQualifications), 사용기술(technologyStacks), 채용보상금(recruitmentCompensation)

- 하나의 회사(company)는 여러개의 채용공고(recruitment-notice)를 등록할 수 있어야 하기 때문에, 회사(id)와 채용공고(id)의 관계를 일대다로 설정했습니다. 따라서 회사명(companyName)의 경우, companyId로 조회할 수 있습니다.

- 채용 공고 등록 시, 경력(experienceYears)은 신입(0)부터 10년차(10)까지 세부 설정이 가능하고, 10년차 이상(11)은 단일 선택항목으로 둡니다. 경력은 배열로 받지만, db write 시 json string으로 변환하여 저장하고 read시 json으로 parse하여 가져옵니다.

- 근무지 좌표계(coordinate) 필드의 경우 올바른 주소를 저장하기 위한 검증이 필요합니다. 따라서 위도와 경도 값을 갖는 객체를 json string으로 저장하였습니다. read 시 객체로 파싱하여 가져옵니다. 위도와 경도로 저장한 이유는, 외부 api(ex. kakao)를 활용해 주소 값을 검증이 필요할 수 있기 때문입니다. (검증코드는 구현하지 않았습니다.)

- 채용공고는 한 번에 하나의 직군과 직무만 명시할 수 있습니다. 직군(jobGroup)과 직무(job) 필드의 경우 직무가 직군의 자식 개념이 되므로 직군을 key, 직무를 value로 하는 jobCategory 객체로 정의하여 비즈니스 로직에서 사용합니다. enum 대신 object를 as const로 선언하여 사용했습니다. (단, db에 저장할 때는 직군과 직무를 별도의 varchar column으로 저장합니다.) 편의상 개발 직군의 몇 개의 직무만을 선언해두었습니다. 실제로 채용 담당자가 선택할 수 있는 직군과 직무 데이터는 db에 따로 저장되어 있어야 하며 비즈니스 로직에서는 db에 저장된 데이터와 일치하는지를 확인하는 검증로직이 필요합니다. (코드 구현은 하지 않았습니다.)

> 채용 공고(recruitment_notice)는 여러개의 직무(job)로 분류될 수 있어야 하기 때문에 채용공고와(id) 직무(id)와의 관계를 다대일로 설정했습니다.
>
> 직군(job_group)은 여러개의 직무(job)를 가지므로 직군(id)과 직무(id)와의 관계를 일대다로 설정했습니다. 또한 직군의 고유 무결성을 위해, name 컬럼에 unique 제약을 설정하였습니다. 직무의 경우, 직무의 고유 무결성을 위해 name 컬럼과 name, job_group_id 컬럼 쌍에 unique 제약을 설정하였습니다.

- 공고서론, 자격요건, 혜택 및 복지, 주요 업무, 우대사항의 경우 다른 문자열 데이터들보다 큰 데이터를 담을 가능성이 높습니다. 또한 채용공고를 상세 조회할 때만 필요한 데이터이므로, 비교적 자주 조회되지 않는 값이라고 할 수 있습니다. 따라서 column type을 text로 정의했습니다.

> text보다는 aws s3 같은 객체 스토리지에 값을 저장하고 rdb에는 s3 url을 저장하는 것이 효율적일 것 같습니다.

---

### 2. 채용공고 수정

[dto]

- nestjs에서 제공하는 PartialType을 이용해 CreateRecruitmentNoticeDto에서 수정하면 안되는 값을 제외(OmitType)하여 UpdateRecruitmentNoticeDto를 만들었습니다.
- 요구사항에서는 id를 제외한 모든 값이 수정 가능하다고 하였고, 필드를 자유롭게 추가해도 된다고 적혀있었지만 채용공고를 게시한 회사와 직무가 바뀌는 것은 바람직하지 않다고 판단하여 companyId와 jobId는 수정 가능한 필드에서 제외하였습니다.
- dto의 값을 리터럴 객체로 변환하는 매퍼(getProps)를 정의하였습니다. 필드 값을 불변으로 하기 위해 Object.freeze를 사용하였습니다. (추후 freeze가 아닌 deepFreeze로 변경이 필요함)

[entity]

- 멤버변수를 업데이트할 수 있는 메소드(update)를 정의하였습니다. 수정할 필드(props)를 인자로 받습니다.

[controller]

- 자원의 값 전체의 변경을 의미하는 put 메소드보다 부분을 변경하는 patch 메소드가 적절하다고 생각헤 patch 메소드를 사용하였습니다.
- dto에서 정의한 매퍼 메소드로 값을 변환하고, id 값을 number로 변환한 후 service 메소드를 호출했습니다.

[service]

- id로 repository에서 채용공고 엔티티를 가져온 후 dto에서 추출한 props로 필드를 인자로 전달하여 entity에서 정의된 메소드(update)를 호출합니다. 이후 수정된 엔티티를 다시 repository에 save합니다.
- 수정할 공고id는 path parameter로 받습니다. 하나의 채용공고에는 많은 데이터가 담기므로, 수정 할 데이터만 request body로 받아서 수정 로직을 구현했습니다.

---

### 3. 채용공고 삭제

[controller]

- 채용공고 id를 받아 삭제합니다.

[service]

- 채용 공고삭제 이력도 관리해야 할 데이터라고 생각하여 soft delete 방식으로 구현했습니다.
- softDelete 메소드의 리턴 객체에는 affected 프로퍼티가 있습니다. 삭제된 튜플의 개수를 value로 갖고 있는 프로퍼티입니다. softDelete는, 요청한 id가 db에 없는 경우 affected의 값을 0으로 반환합> 니다. 따라서 affected < 1 일때, id가 존재하지 않는다는 BadRequestException을 throw했습니다.

[entity]

- 채용공고가 삭제되면 회사는 지원자(user) 정보를 더 이상 조회할 수 없어야 하고, 구직자는 자신이 어떤 회사에 지원했는지 지원 이력은 확인 가능해야 합니다.

---

### 4. 채용공고 목록 조회

[dto]

- page-options.dto.ts : PageOptionsDto로 api 요청의 queryParameter의 값을 검증하는 메소드와 변환된 값을 얻을 수 있는 getter를 구현하였습니다.
- page-meta.dto.ts : 채용공고 목록 응답 값 중 meta 데이터를 담는 응답 dto입니다. 페이지네이션에 필요한 규칙을 담당합니다.
- page.response-dto.ts : 채용 공고 목록 조회 요청의 응답 dto입니다. 채용 공고 목록 외에도 사용될 여지가 있으므로 data의 타입은 제네릭으로 설정하였습니다.

[repository]

- getPaginatedList : 페이지네이션 된 채용공고 목록 데이터와 채용공고 수를 리턴합니다. typeORM의 findOperator를 사용하면 데이터의 계층구조가 오히려 깔끔하지 못하기 때문에 queryBuilder를 사용하여 join이 필요한 테이블을 leftjoin 후 필요한 컬럼을 select하였습니다.
- addSearchQuery : searchQuery를 추가하는 메소드입니다.
- whereFactory : addSearchQuery 메소드에서 중복 코드를 분리한 메소드입니다.

#### 4-1. 채용공고 목록 페이지네이션

- 채용공고 목록 조회 시 페이지네이션 값인 take(=limit), page(=offset) 값과 정렬 값(order)을 함께 request query parameter로 요청합니다. 채용공고 목록(data)과 함께 이후 데이터 요청에 필요한 데이터(meta)를 함께 반환합니다. 전체 페이지 수보다 큰 값을 조회 요청 페이지 값으로 전달하는 경우 더이상 추가로 조회 가능한 요청이 없다는 메시지를 에러를 반환합니다.

- 채용공고 목록 조회시 표시되는 데이터(data)는 채용공고 id, 공고명(title), 회사명(companyName), 근무지의 광역시/도 주소(provinceName)와 시/군/구 주소(cityName), 채용 보상금(recruitmentCompensation), 공고 생성일(createdAt)입니다.

- 데이터 요청에 필요한 데이터 응답 값(meta)은 page, take, 총 채용공고 수(total), 가장 마지막 페이지(lastPage), 이전 페이지/이후 페이지 유무(hasPreviousPage/hasNextPage)입니다.

#### 4-2. 채용공고 목록 검색

- 페이지네이션 query에 검색 쿼리(search)를 함께 전달합니다. 채용공고 검색 기준은 "공고명", "회사명" 입니다.

- 검색 결과에 따라 meta 데이터도 다르게 반환합니다.

- 검색어는 띄어쓰기를 기준으로 단어를 분리하여 검색합니다. 예를들어 '백엔드', '원티드'로 검색하는 경우, 공고명과 회사명에 '백엔드' 또는 '원티드'가 포함된 채용공고 목록을 data 값으로 받아볼 수 있습니다.

---

### 5. 채용 상세페이지 조회

- 회사가 올린 다른 채용 공고를 추가적으로 포함하는 방법은 채용 상세 정보 조회 쿼리에 포함하여 한 번에 가져오는 방법과, 상세 정보를 가져온 후, 별도로 채용공고 목록을 가져와 서비스단에서 데이터를 붙이는 방법이 있습니다. 전자의 방법은 RDBMS의 JOIN과 SUBQUERY를 사용하면 됩니다. 하지만, 기존의 채용 목록 조회 api에서 사용한 코드를 재활용할 수 있고, 회사가 올린 다른 채용공고를 보여주는 요구사항이 '이 공고와 유사한 채용 공고'를 보여주는 요구사항으로 변화했을때 대응이 수월할 것 같다는 점. 그리고 채용 목록 조회 api에서 제공하는 데이터로도 충분할 것으로 예상되므로 후자의 방식으로 구현했습니다.

### 6. 채용 공고 지원

- 하나의 채용공고(recruitment-notice)는 여러명의 구직자의 지원서를 받을 수 있고, 구직자(user)는 여러개의 채용공고에 지원할 수 있습니다. 따라서 구직자(id)와 채용공고(id)의 관계를 다대다로 설정하는 것이 좋습니다. typeORM에서 지원하는 @JoinTable로 연결 테이블을 생성할 수 있지만 다음과 같은 문제로 이 기능을 사용하지 않고 별도의 엔티티(jobApply)를 생성하여 각각 일대다, 다대일 관계를 맺었습니다.

> - 연결 테이블은 매핑 정보만 컬럼으로 가질수 있다는 한계가 있습니다. jobApply 테이블에는 지원 상태(statement) 값이 저장되어야 하며 이외에도 지원 시간, 상태(statement)변화 시간 등 컬럼을 추가할 가능성이 높습니다.
> - 구직자와 채용 공고의 관계(relation)는 '지원'의 관계로도 묶일 수 있지만 '스크랩, 좋아요'등의 기능으로도 묶일 수 있으므로 가상의 연결테이블 보다 엔티티를 활용하는 것이 좋다고 생각합니다.

- 구직자는 하나의 채용공고에 1회만 지원 가능하므로, jobApply 테이블에서 구직자\_id 컬럼과 채용공고\_id 컬럼을 한 쌍으로 unique key 제약을 설정했습니다.
