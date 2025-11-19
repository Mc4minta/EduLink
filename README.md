
# Quick Setup - Vite React Project

## 1. Clone project
```bash
git clone https://Mc4minta/Edulink.git
cd Edulink
```
## 2. Create .env file
- Create a file named .env in the project root
- Add these variables (replace with your own values):
```txt
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
VITE_ALLOWED_HOSTS="your-ngrok-id.ngrok-free.app"
```
## 3. Fixing npm error (If found)

- if you got this error

```npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For
more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm i
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

- Run this

```txt
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

- try run npm again

## 4. Hosting this project with ngrok

install dependencies

```bash
npm install
```

run development server

```bash
npm run dev
```

open another terminal and run ngrok

```bash
ngrok http 8080
```

you will see this output

```bash
ngrok                                                                                                                                                        (Ctrl+C to quit)                                                                                                                                                                             �  Block threats before they reach your services with new WAF actions → https://ngrok.com/r/waf                                                                                                                                                                                                                                                          Session Status                online                                                                                                                                         Account                       mintaconan4826@gmail.com (Plan: Free)                                                                                                          Update                        update available (version 3.33.0, Ctrl-U to update)                                                                                            Version                       3.22.1                                                                                                                                         Region                        Asia Pacific (ap)                                                                                                                              Web Interface                 http://127.0.0.1:4040                                                                                                                          Forwarding                    https://a5b797cb4aac.ngrok-free.app -> http://localhost:8080                                                                                                                                                                                                                                                                Connections                   ttl     opn     rt1     rt5     p50     p90                                                                                                                                  0       0       0.00    0.00    0.00    0.00      
```

then copy the link here and paste in .env

```bash
https://a5b797cb4aac.ngrok-free.app
```

paste here

```txt
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"

# here
VITE_ALLOWED_HOSTS="your-ngrok-id.ngrok-free.app"
```

then access your website using the ngrok link


test test