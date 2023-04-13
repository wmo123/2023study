# 一文让你了解如何为 Git 设置代理

[原文]: https://ericclose.github.io/git-proxy-config.html#Git-使用-SSH-传输协议的代理方法

------

### 实例

> 针对 Git 使用 HTTP / HTTPS 传输协议的代理方法，在 Windows，Linux，macOS 上用户的操作均是一样的。

也许你光看我上面的内容还看不明白，不妨我们来看下实例部分：

此处以 Clash for Windows 为例子。如图：

![image](D:\document\2023study\git\1.png)

Clash for Windows 既支持 **HTTP / HTTPS** 协议代理，也支持 **SOCKS v5** 协议代理。如果你使用其他的代理软件，你可以根据你使用的代理软件的**代理协议**和本地**端口号**参考本文修改即可。

------

#### 针对所有域名的 Git 仓库

根据你的代理软件支持的代理协议**选取其中一种**即可：

- http 代理
- socks5 代理

```
COPYgit config --global http.proxy http://127.0.0.1:7890
```

**注意**：*7890* 为 Clash for Windows 的 http 代理端口。

------

#### 针对特定域名的 Git 仓库

前面我们说的是，让所有域名下的仓库都走代理的情况，但是在现实情况下我们并不想这么做。那么现在我来介绍一下针对特定域名仓库走代理的做法，此处以 GitHub 为例:

当我们在 GitHub 仓库使用 HTTPS 传输协议克隆源码时，我们往往是这么做的的：

```
COPYgit clone https://github.com/<user>/<repository>.git
```

那么我前面**命令注解**所提到的 `<url>` 就是 `https://github.com`

根据你的代理软件支持的代理协议**选取其中一种**即可：

- http 代理
- socks5 代理

```
COPYgit config --global http.https://github.com.proxy http://127.0.0.1:7890
```

------

## Git 使用 SSH 传输协议的代理方法

在这种情况下，Git 依靠 ssh 程序处理连接； 为了通过代理进行连接，您必须配置 ssh 程序本身，在 `~/.ssh/config` 文件中设置 **ProxyCommand** 选项，通过在 **ProxyCommand** 中声明，使用**不同操作系统下**的程序来通过代理建立连接。

- **macOS** 是通过在 ProxyCommand 中声明 `nc` 程序（该 nc 程序命令为系统自带的 OpenBSD 版本的 netcat 提供）来代理的；

- **Linux** 一样可以通过 `nc` 程序、但是 Linux 上 `nc` 程序有 2 种 netcat 版本可以提供，分为 Nmap 版和 OpenBSD 版。如果是 OpenBSD 的版本，则 `nc` 命令与 macOS 相同；如果是 Nmap 版本的，`nc` 其实是指向 `ncat` 程序的**符号链接**，则其具体命令不一样；各 Linux 发行版本下 netcat 软件包名如下表：

  | Linux 发行版本 / netcat 软件包名 | Nmap 版     | OpenBSD 版       |
  | -------------------------------- | ----------- | ---------------- |
  | Fedora 系列                      | `nmap-ncat` | `netcat`         |
  | Debian 系列                      | `ncat`      | `netcat-openbsd` |

- **Windows** 下则是通过安装 Git for Windows 附带的 `connect` 程序。

------

<details cyan="" open="" style="box-sizing: border-box; outline: none; margin: 1em 0px; padding: 16px; display: block; border-radius: 4px; background: var(--color-card); font-size: 0.9375rem; transition: all 0.28s ease 0s; border-color: rgba(27, 205, 252, 0.3); border-top-style: ; border-top-width: ; border-right-style: ; border-right-width: ; border-bottom-style: ; border-bottom-width: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ;"><summary style="box-sizing: border-box; outline: none; margin: -16px -16px 0px; padding: 16px; display: block; cursor: pointer; border-radius: 4px 4px 0px 0px; color: rgb(68, 68, 68); font-size: 0.875rem; font-weight: bold; position: relative; line-height: normal; background: rgb(232, 250, 254); border-bottom: 1px solid rgba(27, 205, 252, 0.3);">相关 man 手册（点击展开）</summary><div class="content" style="box-sizing: border-box; outline: none; margin: 0px -16px -16px; padding: 16px;"><ul style="box-sizing: border-box; outline: none; margin: 0px 0px 1em 16px; padding: 0px 0px 0px 8px; font-size: 0.9375rem; list-style: initial;"><li style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; list-style: initial;"><a target="_blank" rel="noopener" href="https://man.openbsd.org/ssh_config" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgb(33, 150, 243); cursor: pointer; text-decoration: none; transition: all 0.28s ease 0s; word-break: break-word;">ssh_config(5)</a><span>&nbsp;</span>ProxyCommand 的内容:</li></ul><figure class="highlight plaintext" style="box-sizing: border-box; outline: none; margin: 1em 0px; padding: 0px; display: block; position: relative; width: 742.667px; background: var(--color-block); font-size: 0.8125rem; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; border-radius: 4px; line-height: 1.5; -webkit-font-smoothing: auto; transition: all 0.28s ease 0s;"><table style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; border-collapse: collapse; overflow: auto; display: block; max-width: 100%; vertical-align: text-top; background-color: transparent; border: none;"><tbody style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><tr style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; word-break: keep-all; background-color: transparent; transition: all 0.28s ease 0s;"><td class="code" style="box-sizing: border-box; outline: none; margin: 0px; padding: 20px 16px; border: none; line-height: 1.5; font-size: 12px; vertical-align: top; background-color: transparent;"><button class="btn-copy" data-clipboard-snippet="" style="box-sizing: border-box; outline: none; margin: 0px; padding: 4px 8px; color: var(--color-meta); font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: 11px; line-height: inherit; font-family: Menlo, Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; overflow: visible; text-transform: none; appearance: none; cursor: pointer; z-index: 1; display: inline-block; border: none; user-select: none; background: var(--color-block); border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; position: absolute; top: 1px; right: 1px; opacity: 0; transition: all 0.28s ease 0s;"><i class="fa-solid fa-copy" style="box-sizing: border-box; outline: none; margin: 0px 4px 0px 0px; padding: 0px; -webkit-font-smoothing: antialiased; display: var(--fa-display,inline-block); font-style: normal; font-variant: normal; line-height: 1; text-rendering: auto; font-family: &quot;Font Awesome 6 Free&quot;; font-weight: 900;"></i><span style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;">COPY</span></button><pre style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; tab-size: 4; overflow: auto hidden; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 0.8125rem; position: relative; display: block; background: transparent; border: none; border-radius: 4px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">ProxyCommand</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">Specifies the command to use to connect to the server. The command string extends to the end of the line, and is executed using the user's shell ‘exec’ directive to avoid a lingering shell process.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">Arguments to ProxyCommand accept the tokens described in the TOKENS section. The command can be basically anything, and should read from its standard input and write to its standard output. It should eventually connect an sshd(8) server running on some machine, or execute sshd -i somewhere. Host key management will be done using the Hostname of the host being connected (defaulting to the name typed by the user). Setting the command to none disables this option entirely. Note that CheckHostIP is not available for connects with a proxy command.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">This directive is useful in conjunction with nc(1) and its proxy support. For example, the following directive would connect via an HTTP proxy at 192.0.2.0:</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">ProxyCommand /usr/bin/nc -X connect -x 192.0.2.0:8080 %h %p</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"></pre></td></tr></tbody></table></figure><ul style="box-sizing: border-box; outline: none; margin: 1em 0px 1em 16px; padding: 0px 0px 0px 8px; font-size: 0.9375rem; list-style: initial;"><li style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; list-style: initial;">Nmap 提供的<span>&nbsp;</span><a target="_blank" rel="noopener" href="https://man7.org/linux/man-pages/man1/ncat.1.html" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgb(33, 150, 243); cursor: pointer; text-decoration: none; transition: all 0.28s ease 0s; word-break: break-word;">nc(1)</a><span>&nbsp;</span>程序<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">--proxy</code><span>&nbsp;</span>和<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">--proxy-type</code><span>&nbsp;</span>的内容：</li></ul><figure class="highlight plaintext" style="box-sizing: border-box; outline: none; margin: 1em 0px; padding: 0px; display: block; position: relative; width: 742.667px; background: var(--color-block); font-size: 0.8125rem; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; border-radius: 4px; line-height: 1.5; -webkit-font-smoothing: auto; transition: all 0.28s ease 0s;"><table style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; border-collapse: collapse; overflow: auto; display: block; max-width: 100%; vertical-align: text-top; background-color: transparent; border: none;"><tbody style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><tr style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; word-break: keep-all; background-color: transparent; transition: all 0.28s ease 0s;"><td class="code" style="box-sizing: border-box; outline: none; margin: 0px; padding: 20px 16px; border: none; line-height: 1.5; font-size: 12px; vertical-align: top; background-color: transparent;"><button class="btn-copy" data-clipboard-snippet="" style="box-sizing: border-box; outline: none; margin: 0px; padding: 4px 8px; color: var(--color-meta); font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: 11px; line-height: inherit; font-family: Menlo, Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; overflow: visible; text-transform: none; appearance: none; cursor: pointer; z-index: 1; display: inline-block; border: none; user-select: none; background: var(--color-block); border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; position: absolute; top: 1px; right: 1px; opacity: 0; transition: all 0.28s ease 0s;"><i class="fa-solid fa-copy" style="box-sizing: border-box; outline: none; margin: 0px 4px 0px 0px; padding: 0px; -webkit-font-smoothing: antialiased; display: var(--fa-display,inline-block); font-style: normal; font-variant: normal; line-height: 1; text-rendering: auto; font-family: &quot;Font Awesome 6 Free&quot;; font-weight: 900;"></i><span style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;">COPY</span></button><pre style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; tab-size: 4; overflow: auto hidden; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 0.8125rem; position: relative; display: block; background: transparent; border: none; border-radius: 4px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">--proxy host[:port] (Specify proxy address)</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">Requests proxying through host:port, using the protocol specified by --proxy-type.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">If no port is specified, the proxy protocol's well-known port is used (1080 for SOCKS and 3128 for HTTP). When specifying an IPv6 HTTP proxy server using the IP address rather than the hostname, the square-bracket notation (for example [2001:db8::1]:8080) MUST be used to separate the port from the IPv6 address. If the proxy requires authentication, use --proxy-auth.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">--proxy-type proto (Specify proxy protocol)</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">In connect mode, this option requests the protocol proto to connect through the proxy host specified by --proxy. In listen mode, this option has Ncat act as a proxy server using the specified protocol.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">The currently available protocols in connect mode are http (CONNECT), socks4 (SOCKSv4), and socks5 (SOCKSv5). The only server currently supported is http. If this option is not used, the default protocol is http.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"></pre></td></tr></tbody></table></figure><ul style="box-sizing: border-box; outline: none; margin: 1em 0px 1em 16px; padding: 0px 0px 0px 8px; font-size: 0.9375rem; list-style: initial;"><li style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; list-style: initial;">OpenBSD 提供的<span>&nbsp;</span><a target="_blank" rel="noopener" href="https://man.openbsd.org/nc" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgb(33, 150, 243); cursor: pointer; text-decoration: none; transition: all 0.28s ease 0s; word-break: break-word;">nc(1)</a><span>&nbsp;</span>程序<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">-X</code><span>&nbsp;</span>和<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">-x</code><span>&nbsp;</span>选项的的内容:</li></ul><figure class="highlight plaintext" style="box-sizing: border-box; outline: none; margin: 1em 0px; padding: 0px; display: block; position: relative; width: 742.667px; background: var(--color-block); font-size: 0.8125rem; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; border-radius: 4px; line-height: 1.5; -webkit-font-smoothing: auto; transition: all 0.28s ease 0s;"><table style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; border-collapse: collapse; overflow: auto; display: block; max-width: 100%; vertical-align: text-top; background-color: transparent; border: none;"><tbody style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><tr style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; word-break: keep-all; background-color: transparent; transition: all 0.28s ease 0s;"><td class="code" style="box-sizing: border-box; outline: none; margin: 0px; padding: 20px 16px; border: none; line-height: 1.5; font-size: 12px; vertical-align: top; background-color: transparent;"><button class="btn-copy" data-clipboard-snippet="" style="box-sizing: border-box; outline: none; margin: 0px; padding: 4px 8px; color: var(--color-meta); font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: 11px; line-height: inherit; font-family: Menlo, Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; overflow: visible; text-transform: none; appearance: none; cursor: pointer; z-index: 1; display: inline-block; border: none; user-select: none; background: var(--color-block); border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; position: absolute; top: 1px; right: 1px; opacity: 0; transition: all 0.28s ease 0s;"><i class="fa-solid fa-copy" style="box-sizing: border-box; outline: none; margin: 0px 4px 0px 0px; padding: 0px; -webkit-font-smoothing: antialiased; display: var(--fa-display,inline-block); font-style: normal; font-variant: normal; line-height: 1; text-rendering: auto; font-family: &quot;Font Awesome 6 Free&quot;; font-weight: 900;"></i><span style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;">COPY</span></button><pre style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; tab-size: 4; overflow: auto hidden; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 0.8125rem; position: relative; display: block; background: transparent; border: none; border-radius: 4px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">-X proxy_protocol</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">Use proxy_protocol when talking to the proxy server. Supported protocols are 4 (SOCKS v.4), 5 (SOCKS v.5) and connect (HTTPS proxy). If the protocol is not specified, SOCKS version 5 is used.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">-x proxy_address[:port]</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">Connect to destination using a proxy at proxy_address and port. If port is not specified, the well-known port for the proxy protocol is used (1080 for SOCKS, 3128 for HTTPS). An IPv6 address can be specified unambiguously by enclosing proxy_address in square brackets. A proxy cannot be used with any of the options -lsuU.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"></pre></td></tr></tbody></table></figure><ul style="box-sizing: border-box; outline: none; margin: 1em 0px 1em 16px; padding: 0px 0px 0px 8px; font-size: 0.9375rem; list-style: initial;"><li style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; list-style: initial;">Git for Windows 附带的<span>&nbsp;</span><a target="_blank" rel="noopener" href="https://web.archive.org/web/20200621143750/https://bitbucket.org/gotoh/connect/wiki/Home#!more-detail" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgb(33, 150, 243); cursor: pointer; text-decoration: none; transition: all 0.28s ease 0s; word-break: break-word;">connect</a><span>&nbsp;</span>程序<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">-H</code><span>&nbsp;</span>和<span>&nbsp;</span><code style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 1em; word-break: break-all; color: var(--color-inlinecode); border-radius: 2px;">-S</code><span>&nbsp;</span>选项的内容</li></ul><figure class="highlight plaintext" style="box-sizing: border-box; outline: none; margin: 1em 0px 0px; padding: 0px; display: block; position: relative; width: 742.667px; background: var(--color-block); font-size: 0.8125rem; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; border-radius: 4px; line-height: 1.5; -webkit-font-smoothing: auto; transition: all 0.28s ease 0s;"><table style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; border-collapse: collapse; overflow: auto; display: block; max-width: 100%; vertical-align: text-top; background-color: transparent; border: none;"><tbody style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><tr style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; word-break: keep-all; background-color: transparent; transition: all 0.28s ease 0s;"><td class="code" style="box-sizing: border-box; outline: none; margin: 0px; padding: 20px 16px; border: none; line-height: 1.5; font-size: 12px; vertical-align: top; background-color: transparent;"><button class="btn-copy" data-clipboard-snippet="" style="box-sizing: border-box; outline: none; margin: 0px; padding: 4px 8px; color: var(--color-meta); font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: 11px; line-height: inherit; font-family: Menlo, Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; overflow: visible; text-transform: none; appearance: none; cursor: pointer; z-index: 1; display: inline-block; border: none; user-select: none; background: var(--color-block); border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; position: absolute; top: 1px; right: 1px; opacity: 0; transition: all 0.28s ease 0s;"><i class="fa-solid fa-copy" style="box-sizing: border-box; outline: none; margin: 0px 4px 0px 0px; padding: 0px; -webkit-font-smoothing: antialiased; display: var(--fa-display,inline-block); font-style: normal; font-variant: normal; line-height: 1; text-rendering: auto; font-family: &quot;Font Awesome 6 Free&quot;; font-weight: 900;"></i><span style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;">COPY</span></button><pre style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; tab-size: 4; overflow: auto hidden; font-family: Menlo, UbuntuMono, Monaco, monospace, courier, sans-serif; font-size: 0.8125rem; position: relative; display: block; background: transparent; border: none; border-radius: 4px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">-H option specify hostname and port number of http proxy server to relay. If port is omitted, 80 is used. You can specify this value by environment variable HTTP_PROXY and give -h option to use it.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">-S option specify hostname and port number of SOCKS server to relay. Like -H option, port number can be omit and default is 1080. You can also specify this value pair by environment variable SOCKS5_SERVER and give -s option to use it.</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);"></span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"><span class="line" style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px; color: rgba(68, 68, 68, 0.9);">-4 and -5 is for specifying SOCKS protocol version. It is valid only using with -s or -S. Default is -5 (protocol version 5)</span><br style="box-sizing: border-box; outline: none; margin: 0px; padding: 0px;"></pre></td></tr></tbody></table></figure></div></details>

------

### 实例

接下来的操作，请按照你的**系统**、选择的 **netcat 的实现版本**以及所使用的**代理协议**进行选择：

------

#### Linux（OpenBSD 版 netcat）和 macOS 用户

- https 代理
- socks5 代理

编辑 `~/.ssh/config` 文件

```
COPYvim ~/.ssh/config
```

给文件加上如下内容:

```
COPYHost github.com
    User git
    ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p
```

> **解释**:
>
> - `Host` 后面 接的 `github.com` 是指定要走代理的仓库域名。
> - 在 ProxyCommand 中，Linux 和 macOS 用户用的是 OpenBSD 版本的 `nc`。
> - `-X` 选项后面接的是 `connect` 的意思是 HTTPS 代理。
> - `-x` 选项后面加上代理地址和端口号。
> - 在调用 ProxyCommand 时，`％h` 和 `％p` 将会被自动替换为**目标主机名**和 **SSH 命令指定的端口**（`%h` 和 `%p` 不要修改，保留原样即可）。

------

#### Linux（Nmap 版 netcat）用户

- http 代理
- socks5 代理

编辑 `~/.ssh/config` 文件

```
COPYvim ~/.ssh/config
```

给文件加上以下内容：

```
COPYHost github.com
    User git
    ProxyCommand nc --proxy 127.0.0.1:7890 --proxy-type http %h %p
```

> **解释**:
>
> - `Host` 后面 接的 `github.com` 是指定要走代理的仓库域名。
> - 在 ProxyCommand 中，Linux 用户用的是 Nmap 版本的 `nc` 。
> - `--proxy-type` 选项后面的 `http` 的意思是指使用 HTTP 代理。
> - 在调用 ProxyCommand 时，`％h` 和 `％p` 将会被自动替换为**目标主机名**和 **SSH 命令指定的端口**（ `%h` 和 `%p` 不要修改，保留原样即可）。

------

#### Windows 用户

- http 代理
- socks5 代理

编辑 `~/.ssh/config` 文件

```
COPYvim ~/.ssh/config
```

给文件加上以下内容：

```
COPYHost github.com
    User git
    ProxyCommand connect -H 127.0.0.1:7890 %h %p
```

> **解释**:
>
> - `Host` 后面 接的 `github.com` 是指定要走代理的仓库域名。
> - 在 ProxyCommand 中，Windows 用户用的是 `connect` 。
> - `-H` 选项的意思是 HTTP 代理。
> - 在调用 ProxyCommand 时，`％h` 和 `％p` 将会被自动替换为**目标主机名**和 **SSH 命令指定的端口**（ `%h` 和 `%p` 不要修改，保留原样即可）。

------

## 如何取消 Git 和 ssh 的代理

这里就不多说了，说了那么多，我们无非就是修改了 2 个文件，即 `~/.gitconfig` 和 `~/.ssh/config` ，**删除**或**注释**我们增加的相应内容（在相应行的开头加上 `#` 即可）即可完成取消代理。

------

## 参考链接

1. [Git - git-config Documentation](https://git-scm.com/docs/git-config)
2. [Configure Git to use a proxy](https://gist.github.com/evantoli/f8c23a37eb3558ab8765)
3. [Tutorial: how to use git through a proxy](https://cms-sw.github.io/tutorial-proxy.html)
4. [ssh_config(5) - OpenBSD manual pages](https://man.openbsd.org/ssh_config)
5. [ncat(1) — Linux manual page](https://man7.org/linux/man-pages/man1/ncat.1.html)
6. [nc(1) - OpenBSD manual pages](https://man.openbsd.org/nc)
7. [SSH Proxy Command – connect.c](https://web.archive.org/web/20200621143750/https://bitbucket.org/gotoh/connect/wiki/Home#!more-detail)
8. [How can I use SSH with a SOCKS 5 proxy?](https://superuser.com/a/454211)
9. [Git 基础——代理](https://jeshs.github.io/2019/04/git基础代理/)
10. [SSH via HTTP proxy in OSX](https://www.perkin.org.uk/posts/ssh-via-http-proxy-in-osx.html)

