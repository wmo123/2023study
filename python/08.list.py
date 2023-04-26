

# 列表的定义

'''创建列表的第一种方式[] '''

lst=['hello','world', 98,'hello']

'''创建列表的第二种方式，使用内置函数list()'''

lst2=list(['hello', 'world', 98])

#列表的特点

#查找列表中指定元素的索引

# print(lst.index('hello')) # 0
# print(lst.index('python')) #ValueError: 'python' is not in list
# print(lst.index('hello', 1,4)) # [1, 4) 3

# 获取列表中的单个元素
#正向从0到N-1
#逆向从-1到-n

# 切片操作
list = [1,2,3,4,5,6,7,8]
print('原list的id：',id(list)) 
print('切片list的id：',id(list[1:4:1])) #切片列表是原列表的拷贝，id不同

print(list[:2:1]) #start不写默认从0开始 [start:stop):step] [1,2]
print(list[1::1]) #stop不写默认到结尾结束 [2, 3, 4, 5, 6, 7, 8]
print(list[1:5:2]) # [2, 4]

'''step为负数''' 
# 找到start，从后往前数到stop
# start如果比stop小则切不出来
# start不写默认从尾部开始切片
# stop不写默认到头部结束切片
print(list[7:5:-1]) # [8, 7]
print(list[2:5:-1]) # []
print(list[:5:-1]) # [8, 7]
print(list[2::-1]) # [3, 2, 1]


'''列表元素的判断和遍历'''

list3 = [1,2,3,'hello']

print(1 in list3) #True
print(4 not in list3) #True

for item in list3:
    print(item)


'''列表元素的增加'''
list4= [True, False]
list3.append('world') #[1, 2, 3, 'hello', 'world']
print(list3)
list3.extend(list4) #[1, 2, 3, 'hello', 'world', True, False]
print(list3)

#指定位置插入元素
list3.insert(1, 'python') #[1, 'python', 2, 3, 'hello', 'world', True, False]
print(list3)

# 切片
list3[1:] = ['hello', 'world']
print(list3) # [1, 'hello', 'world']

'''列表元素的删除'''

# remove删除列表某个元素
# 有重复时只删除第一个
# 返回值为None
list4=[1, 'python', 2, 3, 'hello', 'world', True, False]
print(list4.remove('python')) #None
print(list4) #[1, 2, 3, 'hello', 'world', True, False]

# pop(index)
# 删除指定下标的元素
# 不写下标默认删除最后一个元素
# 返回删除的元素值
print(list4.pop(2)) # 3
print(list4) #[1, 2, 'hello', 'world', True, False]

# 切片 
# 删除至少一个元素
# 返回一个新的列表对象

new_list = list4[2::]
print('原列表', list4) #原列表 [1, 2, 'hello', 'world', True, False]
print('切片列表', new_list) #切片列表 ['hello', 'world', True, False]

# 不产生新的列表对象
list4[1:2:] =[]
print(list4) #[1, 'hello', 'world', True, False]

# 清空列表对象

list4.clear()
print(list4) #[]

# 删除列表对象
# del list4


'''列表对象的修改'''

lst=[1,2,3,'hello']
lst[2] = 'python'
print(lst) #[1, 2, 'python', 'hello']

#切片修改
lst[1:2] = [100,200,300]
print(lst) #[1, 100, 200, 300, 'python', 'hello']

'''列表元素的排序操作'''
#默认升序排列
# reverse=True 降序
# reverse=False 降序
lst = [22,10,43,15]
lst.sort()
lst.sort(reverse=True)
lst.sort(reverse=False)
print(lst)

'''内置sorted()函数，生成一个新列表对象的排序'''
#指定reverse=True降序排序，原列表不发生变化
new_lst = sorted(lst,reverse=True)
print(new_lst)
print(lst)


'''列表生成式'''
lst = [i for i in range(1,6)]
print(lst) #[1, 2, 3, 4, 5]

lst =[i*2 for i in range(1,6)]
print(lst) #[2, 4, 6, 8, 10]