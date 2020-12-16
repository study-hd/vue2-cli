/*
 * 用户相关
 * */

import request from "@/plugins/axios";
import baseURL from "@/api/index";

export function getPhoneCode(data) {
  return request({
    url: baseURL.getPhoneCode,
    method: "GET",
    data,
  });
}

export function login(data) {
  return request({
    url: baseURL.login,
    method: "POST",
    data,
  });
}

export function logout(data) {
  return request({
    url: baseURL.logout,
    method: "GET",
    data,
  });
}

export function getUserInfo(data) {
  return request({
    url: baseURL.getUserInfo,
    method: "GET",
    data,
  });
}
