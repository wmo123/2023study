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