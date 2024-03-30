---
title: "Using Git LFS in a Project"
date: "2018-11-26"
categories: 
  - "programming"
tags: 
  - "command-prompt"
  - "git"
  - "git-lfs"
  - "github"
  - "lfs"
  - "terminal"
coverImage: "./images/gitlogo.jpg"
---

Your Terminal is showing something like this:

```
C:\Users\simon\Documents\GitHub\ComputationalPerceptionExtended\examples>git push
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 762.98 MiB | 1.87 MiB/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: ef2ebb0864349934e99fe114685686f8
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File examples/mybigfile.mp4 is 775.10 MB; this exceeds GitHub's file size limit of 100.00 MB
To https://github.com/TheCell/ComputationalPerceptionExtended.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://github.com/TheCell/ComputationalPerceptionExtended.git'
```

There are 3 steps to go to get your project fixed and working. This guide is only discussing a solution for newely added files over 100MB and not existing files that get bigger. In the shared link there is a description for that scenario aswell. The link is [https://github.com/git-lfs/git-lfs/wiki/Tutorial](https://github.com/git-lfs/git-lfs/wiki/Tutorial) and walks through the process just like this post but with multiple scenarios (ex: files got too big over time).  

1. install Git LFS  
    
2. reset the commit with the file  
    
3. track the file and commit

Install Git LFS (only once per windows/linux)  

First of all we need the Git LFS extension. Download it under [https://git-lfs.github.com/](https://git-lfs.github.com/) and install the extension. For windows it's just installing the exe. (Linux please take a look here [https://github.com/git-lfs/git-lfs/wiki/Installation](https://github.com/git-lfs/git-lfs/wiki/Installation) (basically just install it via package manager))  

```
sudo apt-get install git-lfs
```

reset the commit with the file (NOT pushed)  

Most likely we will already have a commit ready to push with a bigger then 100 MB file and now we are stuck, right? To undo the commit **without deleting** everything we just wanted to push, reset to a previous commit. The ~1 stands for go 1 commit back. The status should now show you that there are not commited changes again.  
([https://stackoverflow.com/questions/1611215/remove-a-git-commit-which-has-not-pushed](https://stackoverflow.com/questions/1611215/remove-a-git-commit-which-has-not-pushed))  

```
git reset --soft HEAD~1
git status
```

* * *

If you **want to delete the commit** and all changes use the following. Note that there are multiple options here instead of origin/master you can use the commit-id (something like '6787f7edcb8a66d9711526dc0c8e61612c0bf0ac')  

```
git reset --hard origin/master
```

* * *

If you have not commited the files but already added them to the commit list you can take the big files out of the commit first. ([http://data.agaric.com/undo-git-add-remove-files-staged-git-commit](http://data.agaric.com/undo-git-add-remove-files-staged-git-commit))  

```
git reset -- folder/mybigfile.mp4
```

track the file and commit

Git LFS is installed now but the repository still does not use the Git LFS. So open up a Command Prompt / Terminal and change to the git repository folder. We initialize the LFS support now.

```
git lfs install
```

Now we need to track the big files in the .attributes files

```
git lfs track "mybigfile.mp4"
```

you can add multiple files by repeating this command with the filenames or add all files with the ending by writing '\*.mp4' and so on. You can check the .attributes file to see if all your files have been added to it. Then we check again.  

```
git status
```

```
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   .gitattributes
        new file:   mybigfile.mp4
```

Now the big files will be tracked and handled by git lfs. We can continue our work normally and commit to github.

```
git commit -m "added big file"
git push
```

Extra info: You can see the files that are tracked by LFS by using

```
git lfs ls-files
```

Hope this helps you out it would certainly have helped me out.
