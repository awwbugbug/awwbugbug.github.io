---
title: "Telegram 群聊机器人"
url: "/project-details/telegram-bot/"
draft: false
---

# Telegram 群聊机器人

这是一个基于 **Telegram Bot + Gemini API + Python** 构建的群聊助手。

## 已实现功能

- 群内 `@机器人` 触发
- Gemini 问答
- 最近消息上下文记忆
- 回复链优先理解
- `/clear` 清空上下文
- 长消息自动分段发送
- 指定群白名单控制

## 技术栈

- Python
- python-telegram-bot
- Gemini API
- SQLite

## 当前状态

目前已经能够在指定 Telegram 群中稳定运行，适合作为个人机器人项目的基础版本。

## 后续计划

- 增加更多管理命令
- 优化群聊多话题上下文理解
- 云端部署常驻运行