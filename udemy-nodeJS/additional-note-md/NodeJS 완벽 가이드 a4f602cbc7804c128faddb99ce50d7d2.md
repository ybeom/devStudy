# NodeJS 완벽 가이드

# HTTP headers

-   Authorization: constains the credentials to authenticate a user-agent with a server
    -   Authorization: <auth-scheme> <authrization-parameters>
        -   auth-scheme: Basic, Digest, Negotiate, AWS4-HMAC-SHA256
        ![Untitled](NodeJS%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%87%E1%85%A7%E1%86%A8%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20a4f602cbc7804c128faddb99ce50d7d2/Untitled.png)
-   Location
-   Cookie: Contains stored HTTP cookies previously sent by the server with the Set-Cookie header
    -   Set-Cookie: Send Cookies from the server to the user-agent
        -   Set-Cookie: <cookie-name> = <cookie-value>; [option];
            -   option: Expires=<date> / Max-Age=<number> / Domain=<domain-value> / Path=<path-value> / Secure / HttpOnly / SameSite=Strict / SameSite=Lax / SameSite=None; Secure
-   CORS: Cross-Origin Resource Sharing ⇒ determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests
-   Content-Length / Content-Type / Content-Encoding / Content-Language / Content-Location

# FS

-   FileHandle
    -   appendFile: fsPromises.open()에서 세팅된 이후로 변경 불가. 이 부분을 제외하곤 writeFile과 동일
    -   writeFile(Sync): 비동기적으로 파일에 데이터 작성. 만약 파일이 이미 존재하면 덮어씀. 데이터로는 문자, 버퍼, 비동기이터러블, 이터러블 등이 올 수 있음. 동작이 성공해도 arguments를 리턴하지는 않음
    -   chmod: modifies the permissions on the file / .chomod(mode) / mode=integer
    -   chown: changes the ownership of the file
        -   uid: The file’s new owner’s user id.
        -   gid: the file’s new group’s group id.
    -   readFile(Sync): 현재 포지션부터 파일의 끝까지를 불러오는 메서드(참고: .read() 는 파일의 일부를 버퍼 형태로 불러옴) + 디폴트로 비동기. readFileSync는 동기적 작업
        -   options ⇒ encoding / signal
        -   reuturn ⇒ buffer 타입
    -   copyFile(Sync): 파일 복사 ⇒ fsp.copyFile( src, dest[,mode])
        -   복사할 파일명이 이미 존재할 경우 에러 출력 ⇒ 뒤에 contstants.COPYFILE_EXCL 옵션으로 넣어주기
    -   fsp
        -   link: creates a new link from the existingPath(쉽게 생각해서 윈도우 바로가기)
        -   mkdir: 폴더 생성
        -   open: fsp.open(path, flags[,mode]) ⇒ flag에 선언된 filehandle로 파일열기
        -   rm: 파일 또는 디렉토리 삭제
        -   truncate: path의 콘텐츠를 len bytes로 자르기
        -   watch: 파일 이름 바꾸기.
-   Class: fs.dir
    -   A class representing a directory stream
    -   fs.opendir(), fs.opendirSync(), fsp.opendir() 로 인스턴스 생성
    -   비동기 이터레이션에선 자동적으로 닫힘
    -   내장 메소드 일부: dir.close(callback) / dir.path / dir.read(callback)
-   Class: fs.ReadStream
    -   createReadStream() 로 인스턴스 생성
        -   createReadStream()
    -   Event: close, open, ready
    -   method: bytesRead, path, pending
-   Class: fs.Stats
    -   파일 정보를 담고 있는 클래스(객체)
    -   fs.stat(), fs.lstat(), fs.fstat()으로 인스턴스 생성
    -   method: isBlockDevice(), isDirectory(), isFIFO(), isFile(), ifSocket() 등
-   Class: fs.WriteStream
    -   createWriteStream() 로 인스턴스 생성
    -   Event: close, open, ready
    -   method: bytesWritten(), close([callback]), path(), pending(), constants()
-   constants: fs에서 사전에 지정된 옵션값

# res.writeHead

-   res.writeHead(statusCode[, statusMessage][, headers])
    -   Sending a response header to the request.
        -   This method must only be called once on a message and it must be called before response.end() is called.
    -   3-digit HTTP status code
        -   **1xx informational response**
            -   100 Continue
            -   101 Switching Protocols
            -   102 Processing
            -   103 Early Hints
        -   **2xx SUCCESS**
            -   200 OK
            -   201 Created
            -   202 Accepted
            -   203 Non-Authoritative Information
            -   204 No Content
            -   205 Reset Content
            -   206 Partial Content
            -   207 Multi-Status
            -   208 Already Reported
            -   226 IM Used
        -   **3xx redirection**
            -   300 Multiple Choices
            -   301 Moved Peranently
            -   302 Found
            -   303 See Other
            -   304 Not Modified
            -   305 User Proxy
            -   306 Switch Proxy
            -   307 Temporary Redirect
            -   308 Permanent Redirect
        -   **4xx client errors**
            -   400 Bad Request
            -   401 Unauthorized
            -   402 Payment Required
            -   403 Forbidden
            -   404 Not Found
            -   405 Method Not Allowed
            -   406 Not Acceptable
        -   **5xx server erros**
            -   500 Internal Server Error
            -   501 Not Implemented
            -   502 Bad Gateway
            -   503 Service Unavailable
            -   504 Gateway Timeout
    -   message.rowHeaders
        -   the raw req/res headers list exactly as they were received.
        -   the even-numbered offsets are key values, and the odd-numbered offsets are the associated values.
-   res.statusCode
-   res.setHeader(name, value)
    -   Content-Type ⇒ type/subytpe; parameter=value
        -   Registration at [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml#font)
        -   application ⇒ /json, /pdf, /pkcs8, /zip, /octet-stream
        -   audio ⇒ /mpeg, /vorbis 등
        -   font ⇒ /woff, /ttf, /otf 등
        -   image ⇒ /jpeg, /png, /svg+xml 등
        -   model ⇒ 3D: /3mf, /vrml 등
        -   text ⇒ plain, csv, html
            -   charset=uft-8
        -   multipart/form-data

# 데이터 스트림과 버퍼

-   쉽게 말해 데이터스트림은 하나의 파일을 작은 단위(chunk - type: buffer)로 이루어진 데이터의 집합으로서 제어하는 방식이다. 일반적으로 readable stream / writable stream / duplex stream / transform stram 정도로 구분할 수 있다.
-   .pipe() 메소드로 여러가지 스트림을 연결할(합칠) 수 있다.
-   또 스트림은 ‘data’, ‘end’ 등 이벤트를 기반으로 제어할 수 있다.

```jsx
//form을 통해 req body에 form data가 들어있는 경우
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const { url, method } = req;
    //form을 포함한 html 랜더링 부분 생략
    //req.body => message=value 형태로 전달됨
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", message);
        });
        res.writeHead(302, { Location: "/" });
        return res.end;
    }
});
```

-   [https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/](https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/)
-   [https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93)
