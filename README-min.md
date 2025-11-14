# วิธีรันเว็ปนี้

```
npm i
```

```
npm run dev
```

ถ้าโปรแกรมเตือนว่าไม่มีโปรแกรมอะไรก็ไปหาโหลดเอานะ

ถ้าขึ้น error อันนี้
```npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For 
more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm i
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

ให้รันอันนี้ก่อนแล้วลองใหม่
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```