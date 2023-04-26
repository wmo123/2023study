## 运算符

# 算术运算符  
# 标准算术运算符 + - * /
# print(1+1) #2
# print(1-1) #0
# print(1*2) #2
# print(10/2) # 5.0
# print(11//2) # 5 整除运算，取整运算

# 取余运算符
# print(11%2) # 1 取余运算
# 幂运算符
# print(3**2) # 9 取幂运算


# 赋值运算符
#运算顺序从右往左
#支持链式赋值 a=b=c=20
# 支持参数赋值
# a=10
# a+=20
# print(a) # 30
# a-=30
# print(a) # 0
#支持系列解包赋值
# a,b,c=10,20,30
# print(a, b, c)

# 交换两个变量的值
# a,b = b,a
# print(a, b)

# 比较运算符

# 布尔运算符 
a,b = 1,2
print(a==1 and b==2)    #True  true and true = True
print(a!=1 and b==2)    #False true and false = False
print(a!=1 and b!=2)    #False false and false = False
print(a!=1 or b==2)     #True  true or false = True
print(not a==1 ) 

msg = 'helloworld'
print('h' in msg) # True
print('k' not in msg) # True

# 位运算符
# 转换成二进制计算
print(4&8) # 0 按位与 同为1时结果为1
print(4|8) # 12 按位或 同为0时结果为0
print(4<<1) # 8 向左移动1位，相当于乘以2
print(4<<2) # 16 向左移动2位，相当于乘以4
print(4>>1) # 2 向右移动1位，相当于除以2
print(4>>2) # 1 向右移动2位，相当于除以4


# 运算符中的优先级

#算术>位 >比较> 布尔 >赋值