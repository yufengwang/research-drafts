+++
title = "网络安全"
author = ["wenhu"]
draft = false
+++

## Thread Model {#thread-model}


### Playback attack {#playback-attack}

攻击者把以前发过的消息又发了一遍


#### Suppress-replay attack {#suppress-replay-attack}

抑制-重放攻击


### Confidentiality {#confidentiality}

数据的机密性


### Integrity {#integrity}

完整性


#### Data integrity {#data-integrity}


#### Originality {#originality}


#### timeliness {#timeliness}


### Authentication {#authentication}

端的身份认证

网络中一个实体向另一个实体证明他的身份，服务端的身份认证，客户端的身份认证，即证明我是我


## Cryptography {#cryptography}

cryptography，密码学

Alice, Bob，两个通讯实体


### Symmetric-key Cipher {#symmetric-key-cipher}

对称秘钥密文（一个秘钥），比非对称秘钥更快


### Public-key Cipher {#public-key-cipher}

非对称秘钥密文

特点：

-   两个秘钥
-   公钥加密，私钥解密
-   私钥\*私有\*，公钥公开
-   速度较慢


### 秘钥分发 {#秘钥分发}


#### Session Key {#session-key}

symmetric key， 只有通讯双方知道的单一 key，必须保持私密

仅在单次会话期有效


#### longerlived predistributed keys. {#longerlived-predistributed-keys-dot}

持久的预分配秘钥


#### 公钥分发 {#公钥分发}

如何确认公钥属于 Alice ?


### Key Distribution Center {#key-distribution-center}

秘钥分发中心


### Public Key Infrastructure {#public-key-infrastructure}

公钥体系，维护公钥和实体的关系；

PKI 体系运作的前提为 CA 机构可信

信任链

原理：

-   基于信任的传递
-   浏览器预装了 CA 机构的证书


### Public key certificate {#public-key-certificate}

公钥证书，简称证书，其中一个主要的证书标准，\*X.509\*

证书内容：

1.  待认证的实体的身份（email 或 域名）
2.  待认证的实体的公钥
3.  签名者的身份
4.  数字签名
5.  数字签名算法的标识
6.  证书过期时间（可选）


### Certificate Authority {#certificate-authority}

证书颁发机构，简称 CA


### 信任模型 {#信任模型}


#### 基于 CA {#基于-ca}

绝对可信或绝对不可信，依赖第三方


#### 基于 web of trust (信任网)，例如 PGP {#基于-web-of-trust--信任网--例如-pgp}

在这个模型里，信任是一定程度的信任，让用户自己去决定信任与否


### 证书撤销 {#证书撤销}

当私钥泄露时，证书应该被撤销

ca 机构维护 certificate revocation list


### MAC {#mac}

message authentication code，消息校验码


#### HMAC {#hmac}

hashed message authentication code


### Digital Signature {#digital-signature}

私钥签名，公钥验签


## SSL/TLS {#ssl-tls}


### SSL {#ssl}

Secure Sockets Layer，安全套接字层


### TLS {#tls}

Transport Layer Security，传输层安全

SSL 3 的微小修订版，被 IETF 标准化


### HTTPS {#https}
