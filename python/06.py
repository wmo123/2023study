# 对象的布尔值
# bool()获取

print(bool(None)) # False


num=int(input('请输入一个整数'))
if num%2 == 0:
    print(num, ':是一个偶数')
else:
    print(num,'是奇数')


score=int(input('请输入您的成绩：'))

if 90<=score<=100:
    print('A')
elif 80<=score<90:
    print('B')
elif 70<=score<80:
    print('C')
elif 60<=score<70:
    print('D')
elif 0<=score<60:
    print('E')
else:
    print('不合法')

answer=input('您是会员吗？y/n')
money=float(input('请输入您的购物金额：'))

if answer =='y':
    if money >= 200:
        print('付款金额：', money * 0.8)
    elif 100<=money<200:
        print('打九折，付款金额：', money*0.9)
    else:
        print('不打折，付款金额：', money)   
else:
    print('非会员，不打折，付款金额：', money)

# 条件表达式
num_a=int(input('请输入一个整数a'))
num_b=int(input('请输入一个整数b'))

# 条件为True 执行左侧语句
# 条件为False执行右侧语句
print( str(num_a)+'大于等于'+str(num_b) if num_a>=num_b else str(num_a)+'小于'+str(num_b) )