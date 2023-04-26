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



