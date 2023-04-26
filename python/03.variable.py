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
