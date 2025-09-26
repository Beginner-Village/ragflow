#!/usr/bin/env python3
"""
测试session_key免密登录功能

使用方法:
1. 先通过正常登录获取一个有效的session_key
2. 然后访问任何URL并附加session_key参数
3. 系统应该自动设置cookie并重定向到不含session_key的URL
"""

import requests
import json
import sys

def test_session_key_login():
    """测试通过URL参数中的session_key进行免密登录"""

    # 测试配置
    BASE_URL = "http://127.0.0.1:9380"

    # 这里需要一个有效的session_key（从Coze系统或正常登录获取）
    # 示例：从环境变量或命令行参数获取
    if len(sys.argv) > 1:
        session_key = sys.argv[1]
    else:
        print("请提供一个有效的session_key作为参数")
        print("使用方法: python test_session_key_login.py <session_key>")
        return

    print(f"使用session_key: {session_key[:20]}...")

    # 1. 测试带session_key参数访问用户信息API
    test_url = f"{BASE_URL}/v1/user/info?session_key={session_key}"
    print(f"\n1. 测试URL: {test_url}")

    # 创建会话以保持cookie
    session = requests.Session()

    # 发送请求，允许重定向
    response = session.get(test_url, allow_redirects=True)

    print(f"   状态码: {response.status_code}")
    print(f"   最终URL: {response.url}")
    print(f"   Cookie: {session.cookies.get_dict()}")

    # 检查是否成功设置了cookie
    if 'session_key' in session.cookies:
        print("   ✅ session_key已成功设置为cookie")
    else:
        print("   ❌ 未能设置session_key cookie")

    # 2. 使用已设置的cookie访问其他API（不带session_key参数）
    print("\n2. 使用cookie访问其他API（不带session_key参数）")
    test_url2 = f"{BASE_URL}/v1/user/info"
    response2 = session.get(test_url2)

    print(f"   URL: {test_url2}")
    print(f"   状态码: {response2.status_code}")

    if response2.status_code == 200:
        try:
            user_info = response2.json()
            if user_info.get('code') == 0:
                print(f"   ✅ 成功获取用户信息")
                print(f"   用户邮箱: {user_info.get('data', {}).get('email', 'N/A')}")
            else:
                print(f"   ❌ API返回错误: {user_info.get('message')}")
        except:
            print(f"   响应内容: {response2.text[:200]}")
    else:
        print(f"   ❌ 请求失败")

    # 3. 测试带其他参数的URL
    print("\n3. 测试带其他参数的URL")
    test_url3 = f"{BASE_URL}/v1/kb?page=1&page_size=10&session_key={session_key}"

    # 创建新会话测试
    session3 = requests.Session()
    response3 = session3.get(test_url3, allow_redirects=True)

    print(f"   原始URL: {test_url3}")
    print(f"   最终URL: {response3.url}")

    # 检查URL是否已移除session_key但保留其他参数
    if 'session_key' not in response3.url and 'page=' in response3.url:
        print("   ✅ session_key已从URL移除，其他参数保留")
    else:
        print("   ❌ URL处理可能有问题")

    print("\n测试完成！")

if __name__ == "__main__":
    test_session_key_login()