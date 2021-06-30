```js
	简化版操作
第一步： Git 全局设置
git config --global user.name "ASxx" 
git config --global user.email "123456789@qq.com"git init     //初始化该项目
git add  .
git commit -m "first commit" //将README.md推送到本地仓库中
git remote add origin https://gitee.com/wcnh/vue-cource.git//连接远程仓库地址
git push -u origin master //提交到远程仓库
```

```js
git clone git://github.com/schacon/grit.git 从服务器上将代码给拉下来
最常用的  git pull  //更新
git add readme 文件名（例如：git add readme demo.php）         //代码上传到服务器
git status   //查看项目当前状态
git branch 查看本地所有分支
git status 查看当前状态 
git commit 提交 
git branch -a 查看所有的分支
git branch -r 查看远程所有分支
git commit -am "init" 提交并且加注释 
git remote add origin git@192.168.1.119:ndshow
git push origin master 将文件给推到服务器上 
git remote show origin 显示远程库origin里的资源 
git push origin master:develop
git push origin master:hb-dev 将本地库与服务器上的库进行关联 
git checkout --track origin/dev 切换到远程dev分支
git branch -D master develop 删除本地库develop
git checkout -b dev 建立一个新的本地分支dev
git merge origin/dev 将分支dev与当前分支进行合并
git checkout dev 切换到本地dev分支
git remote show 查看远程库
git add .
git rm 文件名(包括路径) 从git中删除指定文件
git config --list 看所有用户
git ls-files 看已经被提交的
git rm [file name] 删除一个文件
git commit -a 提交当前repos的所有的改变
git add [file name] 添加一个文件到git index
git commit -v 当你用－v参数的时候可以看commit的差异
git commit -m "This is the message describing the commit" 添加commit信息
git commit -a -a是代表add，把所有的change加到git index里然后再commit
git commit -a -v 一般提交命令
git log 看你commit的日志
git diff 查看尚未暂存的更新
git rm a.a 移除文件(从暂存区和工作区中删除)
git rm --cached a.a 移除文件(只从暂存区中删除)
git commit -m "remove" 移除文件(从Git中删除)
git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)
git diff --cached 或 $ git diff --staged 查看尚未提交的更新
git stash push 将文件给push到一个临时空间中
git stash pop 将文件从临时空间pop下来
---------------------------------------------------------
git remote add origin git@github.com:username/Hello-World.git
git push origin master 将本地项目给提交到服务器中
-----------------------------------------------------------
git pull 本地与服务器端同步
-----------------------------------------------------------------
git push (远程仓库名) (分支名) 将本地分支推送到服务器上去。
git push origin serverfix:awesomebranch
------------------------------------------------------------------
git fetch 相当于是从远程获取最新版本到本地，不会自动merge
git commit -a -m "log_message" (-a是提交所有改动，-m是加入log信息) 本地修改同步至服务器端 ：
git branch branch_0.1 master 从主分支master创建branch_0.1分支
git branch -m branch_0.1 branch_1.0 将branch_0.1重命名为branch_1.0
git checkout branch_1.0/master 切换到branch_1.0/master分支

```

某些文件不上传设置

```
在git管理中可以手动创建.gitignore文件来设置。

abc
.abc
.*


以上两条的命名规则是:
忽略所有包含abc的文件(夹)
忽略所有文件夹中后缀是.abc的文件
忽略所有隐藏文件
```



# vscode配置码云

### 第一种情况

1、将代码放到码云

​      到码云里新建一个仓库，完成后码云会有一个命令教程按上面的来就行了

​      码云中的使用教程：

```javascript
第一步： Git 全局设置 (只需配置一次)
git config --global user.name "ASxx" 
git config --global user.email "123456789@qq.com"
git config --list  // 查看配置信息
 
第二部：创建 git 仓库 
1.git init     // 初始化该项目
git status   // 查看状态
2.git add ./  // 将修改推送到暂存区 
3.git commit -m "first commit"  //推送到本地仓
git log --oneline // 查看版本
4.git branch -M main
5. git remote add origin https://github.com/wangconging/vueComponent.git   //连接远程github项目
6.git push -u origin master    //将本地项目更新到github项目上去       
        1.git init     // 初始化该项目
git status   // 查看状态
2.git add ./  // 将修改推送到暂存区 
3.git commit -m "first commit"  //推送到本地仓
git log --oneline // 查看版本
4.git branch -M main
5. git remote add origin https://github.com/wangconging/vueComponent.git   //连接远程github项目
6.git push -u origin master    //将本地项目更新到github项目上去       
        
        
mkdir wap    //创建一个名叫wap的文件夹
cd wap       //进入到wap文件夹中

touch README.md       //创建README.md文件
git add README.md     //将README.md文件提交到暂存区
git commit -m "first commit"  //将README.md推送到本地仓库中
git remote add origin https://git.oschina.net/name/package.git   //连接远程github项目
git push -u origin master    //将本地项目更新到github项目上去

如果已经创建好有项目:
cd existing_git_repo 
git remote add origin https://git.oschina.net/name/package.git
git push -u origin master


```





### 第二种情况：详细配置说明

1、用 vscode打开你的项目文件夹

![1537926783655](C:\Users\ADMINI~1\AppData\Local\Temp\1537926783655.png)



2、配置git

​        打开Git Bash输入以下命令 , 如果还没输入全局配置就先把这个全局配置输入上去

        ```javascript
Git 全局设置:
git config --global user.name "ASxx" 
git config --global user.email "123456789@qq.com"
        ```

​         然后开始做提交代码到码云的配置 

```javascript
cd d:/wamp/www/mall360/wap              //首先指定到你的项目目录下
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://git.oschina.net/name/package.git   //用你仓库的url
git push -u origin master  //提交到你的仓库
```

​            正常情况下上面的命令执行完成后，本地文件夹会有一个隐藏的.git文件夹，云端你的仓库里应该会有一个      README.md文件 

3、在vscode中提交代码到仓库

　　回到vs code打开git工作区就会看到所有代码显示在这里

![1537927100069](C:\Users\ADMINI~1\AppData\Local\Temp\1537927100069.png)



4、点击+号，把所有文件提交到暂存区  ,  然后打开菜单选择--提交已暂存的

![1537927179173](C:\Users\ADMINI~1\AppData\Local\Temp\1537927179173.png)



5、然后按提示随便在消息框里输入一个消息，再按ctrl+enter提交 

![1537927235494](C:\Users\ADMINI~1\AppData\Local\Temp\1537927235494.png)

6、然后把所有暂存的代码push云端 

![1537927270762](C:\Users\ADMINI~1\AppData\Local\Temp\1537927270762.png)



7、点击后，会弹出让你输入账号密码，把你托管平台的账号密码输入上去就行了。。。

不出问题的话你整个项目就会提交到云端上了。

（Tip）提示 :  在vs中每次更新代码都会要输入账号密码，方便起见，可以配置一下让GIT记住密码账号。

```javascript
git config --global credential.helper store   //在Git Bash输入这个命令就可以了
```



8、同步代码

　　这里说下平时修改代码后提交到云端的使用，和本地代码和云端同步

　　随便打开一个文件，添加一个注释

![1537927502214](C:\Users\ADMINI~1\AppData\Local\Temp\1537927502214.png)

可以看到git图标有一个提示，打开git工作区可以看到就是修改的这个文件 

![1537927544361](C:\Users\ADMINI~1\AppData\Local\Temp\1537927544361.png)

然后点击右侧的+号，把他暂存起来 ， 再在消息框里输入消息，按ctrl+enter提交暂存

![1537927601406](C:\Users\ADMINI~1\AppData\Local\Temp\1537927601406.png)

再点击push提交，代码就提交到云端了。 

![1537927628893](C:\Users\ADMINI~1\AppData\Local\Temp\1537927628893.png)



pull使用

比如当你在家里修改了代码提交到云端后，回到公司只需要用vscode打开项目点击菜单中的pull就可以同步过来了。 

![1537927684002](C:\Users\ADMINI~1\AppData\Local\Temp\1537927684002.png)

5、克隆你的项目到本地

　　回到家后想修改代码，但是电脑没有文件怎么办呢？  往下看

　　首先你电脑还是的有vscode 和  GIT，，然后用git把上面那些全局配置再执行一次，如下

```javascript
git config --global user.name "ASxx"
git config --global user.email "123456789@qq.com"  
git config --global credential.helper store  
```

然后打开Git Bash输入以下命令 

```javascript
cd d:/test   //指定存放的目录
git clone https://git.oschina.net/name/test.git   //你的仓库地址
```

![1537927791243](C:\Users\ADMINI~1\AppData\Local\Temp\1537927791243.png)

下载成功，然后就可以用vscode打开项目修改了，修改后提交的步骤还是和上面一样：暂存-提交暂存-push提交到云端就ok了 





# git的一些基础命令

###### 一般配置

```
git --version   //查看git的版本信息
git config --global user.name   //获取当前登录的用户
git config --global user.email  //获取当前登录用户的邮箱
```

###### 登录git

```
/* 如果刚没有获取到用户配置，则只能拉取代码，不能修改  要是使用git，你要告诉git是谁在使用*/

git config --global user.name 'userName'    //设置git账户，userName为你的git账号，
git config --global user.email 'email'
```

###### 创建一个文件夹

```
mkdir nodejs    //创建文件夹nodejs
cd nodejs       //切换到nodejs目录下
```

###### 初始化git仓库

`git init //在nodejs文件夹下初始化一个仓库，此时文件里会到一个.git的隐藏文件夹`

###### 创建忽略文件

```
touch .gitignore    //不需要服务器端提交的内容可以写到忽略文件里
    /*
        .git
        .idea
    */
```

###### 查看目录

```
ls -al
```

###### 创建文件并写入内容

如果文件不存在则会创建文件

```
echo "hello git"
 > index.html       //将'hello git' 写入到index.html中
```

> 单个>箭头表示写入， >>表示追加

###### 查看文件内容

```
cat index.html
```

###### 增加到暂存区中

```
git add index.html
git add -A      //全部添加到缓存区
git add .  表示添加新文件和编辑过的文件不包括删除的文件; 
git add -u 表示添加编辑或者删除的文件，不包括新添加的文件。
git commit  推送修改到本地仓库中
```

###### 增加到版本库中

```
git commit -m '备注信息'
```

###### 查看版本

```
git log --oneline
```

###### 比较差异

比较的是暂存区和工作区的差异

```
git diff 
```

比较的是暂存区和历史区的差异

```
git diff --cached
```

比较的是历史区和工作区的差异（修改）

```
git diff master
```

###### 撤回内容

(如果修改了工作区的文件后发现改错了，可以用暂存区或者版本库里的文件替换掉工作区的文件)

用暂存区中的内容或者版本库中的内容覆盖掉工作区

```
git checkout index.html
```

###### 取消增加到暂存区的内容（添加时）

```
git reset HEAD index.html
```

//显示目录的状体 有没有添加或者修改文件

```
git status
```

###### 删除本地文件

```
rm fileName
```

###### 删除暂存区

保证当前工作区中没有index.html

```
git rm index.html --cached
```

使用--cached 表示只删除缓存区中的内容

###### 回滚版本

回滚最近的一个版本 git log

```
git reset --hard HEAD/commit_id
```

###### 回滚到未来

```
git reflog
```

### 分支管理

创建分支

```
git branch dev
```

切换分支

```
git checkout dev
```

创建分支并切换分支

```
git checkout -b dev
```

删除分支

```
git branch -d dev
```

在分支上提交新的版本

```
git commit -a -m 'dev1'
```

合并分支

```
git merge dev
```

分支的合并后显示log

```
git log --oneline --graph --decorate
```

在分支开发的过程中遇到其他问题需要切换其他分支

保留写好的内容在切换到主干

保留内容

```
git stash 
```

在次切换分之后需要应用一下保留的内容

```
git stash apply
```

丢掉保存的内容

```
git stash drop
```

使用并丢掉

```
git stash pop
```

最佳分支

-有的时候开发需要合并指定的内容，而不是合并所有的提交，所以我们需要挑选最好的，自己生产版本

合并分支把树杈掰到主干上

```
git rebase
```

### 添加远程的仓库

push -u

-u参数 upstream

```
git push origin master -u   //获取最新代码
```

连接远程仓库

```
git remote add origin 仓库的地址
```

查看远程仓库

```
git remote -v
```

删除远程仓库

```
git remote rm origin
```





# git常用命令

###### 安装及配置：

```javascript
Ubuntu下安装：sudo apt-get install git
配置用户名：git config --global user.name "你的名字"
配置e-mail：git config --global user.email "你的邮箱@xx.com"

```

###### 与添加有关的：

```javascript
将当前目录变为仓库：git init
将文件添加到暂存区：git add 文件名 [可选：另一个文件名]
将暂存区提交到仓库：git commit –m "描述"
```

###### 与查询有关的:

```javascript
查询仓库状态：git status
比较文件差异（请在git add之前使用）：git diff 文件名
查看仓库历史记录(详细)：git log
查看仓库历史记录(单行)：git log --pretty=online 或 git log --online
查看所有版本的commit ID：git reflog
```

###### 与撤消有关的：

```javascript
撤销工作区的修改：git checkout -- 文件名
撤销暂存区的修改：git reset HEAD 文件名
回退到历史版本：git reset --hard 该版本ID
回退到上个版本：git reset --hard HEAD^
上上版本是HEAD^^，也可用HEAD~2表示，以此类推
```

###### 与标签有关的：

```javascript
为当前版本打标签：git tag 标签名
为历史版本打标签：git tag 标签名 该版本ID
指定标签说明：git tag –a 标签名 –m "标签说明" [可选：版本ID]
查看所有标签：git tag
查看某一标签：git show 标签名
删除某一标签：git tag –d 标签名
```

###### 与GitHub有关的：

```javascript
先有本地库，后有远程库，将本地库push到远程库
关联本地仓库和GitHub库：git remote add origin 网站上的仓库地址
第一次将本地仓库推送到GitHub上：git push –u origin master
先有远程库，后有本地库，从远程库clone到本地库
从远程库克隆到本地：git clone 网站上的仓库地址
网站地址可以选择HTTPS协议（https://github.com...）、SSH协议（git@github.com...）。
如果选择SSH协议，必须将Ubuntu的公钥添加到GitHub上。见下一步
```

###### SSH Key

```javascript
生成SSH Key：ssh-keygen –t rsa –C "你的邮箱@xx.com"
生成Key时弹出选项，回车选择默认即可。
Key保存位置：/root/.ssh
登陆GitHub，创建new SSH key，其内容为/root/.ssh/id_rsa.pub中文本
已经有了本地库和远程库，二者实现同步
本地库的改动提交到远程库：git push origin master
更新本地库至远程库的最新改动：git pull
```



 