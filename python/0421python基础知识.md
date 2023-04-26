1. print() 函数；

![image-20230421135329667](D:\document\2023study\python\image-20230421135329667.png)

```python
print ("hello world")
print ("hello python")

print(520)
print(98.6)

# 将内容输出到指定文件
# 1.指定盘符要存在
# 2.使用file=p
# 3.'a+' 的含义是如果文件不存在就创建，文件存在就在文件内容后面追加
fp = open('D:/document/2023study/python/test.txt', 'a+')
print('helloworld', file=fp)
fp.close()

# 不进行换行输出
print('hello','world','Python')

# 含有运算符的表达式
print(1+3)
```



2. 转义字符

![image-20230421140641875](D:\document\2023study\python\image-20230421140641875.png)



```python
# 转义字符

print('hello\nworld') # 反斜杠 + 转义功能首字母 \ + newline

print('helloooo\tworld') # \r 水平制表符 tab键 光标移入下一组4个空格的开始处

print('hello\tworld') 

print('hello\rworld') # return 回车 world把hello覆盖

print('hello\bworld') #backspace 回退一个格 o被覆盖了

print('http:\\\\www.baidu.com')

print('老师说：\'大家好\'')

# 原字符 不希望字符串中的转义字符起作用，就使用原字符串 在字符串之前加r或R
print(r'hello\nworld')
# 注意事项 字符串中最后一个字符不能是反斜杠
# print(r'hello\nworld\')

```



3. 变量

   ​																		内存分析图

![image-20230421145951884](D:\document\2023study\python\image-20230421145951884.png)

```python
# python中的保留字和标识符
# 查看保留字
import keyword
print(keyword.kwlist)

# 标识符 变量、函数、类、模块和其他对象起的名字就叫标识符
# 字母、数字、下划线
# 不能以数字开头
# 不能使保留字
# 严格区分大小写


#变量 是内存中带标签的盒子
# 多次赋值后 变量指向新的内存空间
name='玛利亚'

print('标识', id(name))
print('类型', type(name))
print('值', name)

# 数据类型
# 整数类型 int  98
# 浮点数类型 float 0.24
# 布尔类型 bool True、False
# 字符串类型 str 'helloworld'

n1=1.2
n2=2.2
print(n1+n2)

from decimal import Decimal
print(Decimal('1.1')+Decimal('2.2'))


# bool 类型在运算中True=1 False=0
f1=True
f2=False
print(f1+1)
print(f2+1)

# 字符串 不可变得字符序列
# 可以用 单引号'hello' 双引号"hello" 三引号"""hello"""
# 单双引号表示的字符必须在一行
# 三引号标识的字符可以分布在连续的多行

print("""人生苦短，
我用python""")
print('''人生苦短，
我用python''')
```





![image-20230421162153872](D:\document\2023study\python\image-20230421162153872.png)

```python
#数据类型转换
# str()
name='张三'
age=20

print('我叫'+str(name),'今年'+str(age)) #str()函数将其他类型转成了str类型

#int()
s1='128'
f1=98.7
s2='76.77'
ff=True
s3='hello'

print(int(s1)) #128
print(int(f1)) #98
print(int(s2)) #报错 不能使用小数串
print(int(ff)) #1
print(int(s3)) #报错 不能使用非数字串

#float()
print(float('hello')) #报错 非数字串不能转换成float类型
print(float(98)) # 98.0
```

