# openssl fun: CLI encryption 

Gen a real *but fake* 2048bit RSA key to play around with 

``` bash 
$ openssl genrsa -out .priv/fake_2048_RSA.key

$ cat .priv/fake_2048_RSA.key 
-----BEGIN PRIVATE KEY-----
{privkey in here}
-----END PRIVATE KEY-----
```

get yr pub key 

``` bash
$ openssl rsa -in .priv/fake_2048_RSA.key -pubout -out .priv/fake_2048_RSA_public.key 

$ cat .priv/fake_2048_RSA_public.key 
-----BEGIN PUBLIC KEY-----
{pubkey in here}
-----END PUBLIC KEY-----
```

create a digest using private key signing an arbitrary `fileToSign` 

``` bash
$ cat fileToSign 
hey dude

$ openssl dgst -sign .priv/fake_2048_RSA.key -sha256 -out signed_file -binary fileToSign 

$ cat signed_file
(>؂pU
    Zk49"~K
           gwh^^SƍXG]C#s-SϟJ-GIj?e{eRiu[	K`
-~`2F-й-V-{[7qCDbNg,obفXPZ&{O2MC1̘nX_"sֹn󧯯1

$ openssl dgst -verify .priv/fake_2048_RSA_public.key -sha256 -signature signed_file -binary fileToSign 
Verified OK
```

## links 

- https://pagefault.blog/2019/04/22/how-to-sign-and-verify-using-openssl/
- https://www.rapidsslonline.com/blog/openssl-commands-basics/
- [more fun with openssl](https://www.happylittleforkbomb.com/post/fun-with-openssl)
- `$ man openssl`
- https://github.com/openssl/openssl
- [great openssl + tls breakdown](https://opensource.com/article/19/6/cryptography-basics-openssl-part-1)