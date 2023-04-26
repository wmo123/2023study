# 导入相关模块
import gradio as gr
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
from modelscope.outputs import OutputKeys
import cv2
import numpy as np
import os

# 声明安全帽检测器
detector = pipeline(Tasks.domain_specific_object_detection, model='damo/cv_tinynas_object-detection_damoyolo_safety-helmet')

# 可视化函数
def show_image_object_detection_auto_result(img, detection_result):
  scores = detection_result[OutputKeys.SCORES]
  labels = detection_result[OutputKeys.LABELS]
  bboxes = detection_result[OutputKeys.BOXES]
  assert img is not None, f"Image is None!!!"

  for (score, label, box) in zip(scores, labels, bboxes):
    cv2.rectangle(img, (int(box[0]), int(box[1])),
             (int(box[2]), int(box[3])), (0, 0, 255), 2)
    cv2.putText(
      img,
      f'{score:.2f}', (int(box[0]), int(box[1])),
      1,
      1.0, (0, 255, 0),
      thickness=1,
      lineType=8)
    cv2.putText(
      img,
      label, (int(box[0]), int(box[3])),
      1,
      1.0, (0, 255, 0),
      thickness=1,
      lineType=8)

  return img

  # 安全帽检测
def safety_helmet_detect(image):
  result = detector(image[..., ::-1]) # RGB to BGR
  output_image = show_image_object_detection_auto_result(image, result)
  return output_image
  
# 创建gradio的interface
title = "安全帽检测"
description = "上传图片，可自动判断图中的人是否佩戴安全帽。"
examples = [['./telmet.png'], ]
demo = gr.Interface(fn=safety_helmet_detect, inputs=["image"], outputs=[gr.Image(label="检测后图片")], examples=examples, title=title, description=description)
demo.launch()