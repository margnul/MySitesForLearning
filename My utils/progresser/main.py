global_progress = 0

def clip(a, bottom, top):
  return min(max(a, bottom), top)

def func(a, b):
  width = b-a
  value = global_progress / width
  value -= a / width

  value = clip(value, 0, 1)

  return value

for val in range(0, 20):
  val /= 20
  global_progress = val
  print(global_progress, end=" -> ")
  print(func(0.25, 0.8))