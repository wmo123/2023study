1. 下载安装python
2. 下载安装Anaconda；https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/
3. Pypi [Python Package Index]的首字母简写，其实表示的是 Python 的 Package 索引，这个也是 Python 的官方索引。``pip install yfinance``

小羊驼本地环境搭建：

```python
conda create test #创建环境
conda activate test #激活环境
git clone git@github.com:Facico/Chinese-Vicuna.git #利用ssh_key下载项目
# cd 到项目根目录下
# 修改requirements.txt https=》ssh key
pip install -r requirements.txt 
# 添加系统变量 HF_HOME: D:/.cache/huggingface修改hf的缓存目录
# 重启电脑
sh generate.sh #下载模型
conda install m2_base #anaconda环境中执行bash命令
bash generate.sh #启动项目，发生model.eval...报错
#安装指定版本peft
pip uninstall peft
pip install peft==0.2.0
#重启
bash generate.sh
```



