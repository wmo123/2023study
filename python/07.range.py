#range() 函数生成一个整数序列
# 返回值是一个迭代器对象

# r = range(10)
# print(list(r)) #[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# r = range(2, 10)
# print(list(r))  #[2, 3, 4, 5, 6, 7, 8, 9]
# r = range(0, 10, 2)
# print(list(r)) #[0, 2, 4, 6, 8]

# in 和 not in 判断整数序列中是否存在（不存在）指定的整数
# print(10 in r) # False
# print(10 not in r) # True


'''while 循环结构'''

# sum = 0
# a=0

# while a <= 100:
#     if not bool(a%2):    
#         sum+=a
#     a+=1
# print(sum)

'''for in 循环'''
# in表达从（字符串、序列等）中依次取值，称为遍历
# for in遍历的对象必须是可迭代对象

# for item in 'python':
#     print(item)

# 如果在循环体中不需要使用自定义变量，可将自定义变量谢写为‘_'
# for _ in range(5):
#     print('人生苦短，我用python')


# 找出100-999之间的水仙花数

# for item in range(100, 1000):
#     ge=item%10
#     shi=item//10%10
#     bai=item//100
#     # print(bai, shi, ge)
#     if ge**3+bai**3+shi**3 == item:
#         print(item)


'''break 和 continue'''

# for in循环
for item in range(3):
    pwd = input('请输入密码')
    if pwd == '8888':
        print('密码正确')
        break
    else:
        print('密码不正确')

# while循环

a = 0
while a < 3:
    pwd = input('请输入密码：')
    if pwd == '8888':
        print('密码正确')
        break
    print('密码不正确')
    a += 1

'''输出1-50之间，5的倍数'''
for a in range(1,51):
    if a%5 == 0:
        print(a)

for a in range(1, 51):
    if a%5 != 0:
        continue
    print(a)

'''else语句'''

#在循环中，没有碰到break时执行else

for item in range(3):
    pwd = input('请输入密码')
    if pwd == '8888':
        print('密码正确')
        break
    else:
        print('密码不正确')
else:
    print('三次密码均不正确')



a = 0
while a < 3:
    pwd = input('请输入密码')
    if pwd == '8888':
        print('密码正确')
        break
    else:
        print('密码错误')
    a += 1
else:
    print('三次密码均不正确')


'''嵌套循环'''
# 输出九九乘法表

for i in range(1,10):
    for j in range(1, i+1):
        print(i,'*',j, '=',i*j,end='\t')
    print()

'''二重循环中的break和continue'''
# 只控制本层循环

for i in range(1,6):
    for j in range(1, 11):
        if(j%2==0):
            print(j, end=' ')
            # break
            # continue
    print()

