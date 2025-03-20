const express = require('express');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const path = require('path');

const app = express();

const agent = new HttpsProxyAgent('http://127.0.0.1:7890');
const axiosInstance = axios.create({
  httpsAgent: agent
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function verifyRecaptchaToken(token,ip) {
  const secretKey = '0x4AAAAAAAhTdfp_gWmmFO13nXOQwluimxQ'; // 替换为您的密钥
  const apiUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  console.log(' **2');
  try {
    console.log({
        remoteip:ip,
        secret: secretKey,
      });
    const response = await axiosInstance.post(apiUrl, 
    {
        remoteip:ip,
        secret: secretKey,
        response: token,
      },
      {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  // const payload = {
  //   remoteip:ip,
  //   secret: secretKey,
  //   response: token
  // };
  // const response = await axiosInstance({
  //   method: "POST",
  //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${payload.secret}&response=${payload.response}&remoteip=${payload.remoteip}`,
  //   headers: {
  //     "Accept-Encoding": "application/json",
  //   },
  // });

    console.log('cloudflare API response:', response.data);
    if (response.data.success) {
      console.log('cloudflare 验证成功');
    } else {
      console.log('cloudflare 验证失败');
    }

    return response && response.data || {};

  } catch (error) {
    console.error('Error during cloudflare verification:', error);
  }
  return  {"info":"error"};
  
}

app.post('/verify-recaptcha', async (req, res) => {
  const token = req.body.token;
  const ip = req.body.ip;

  if (!token||!ip) {
    res.status(400).json({ error: 'Ip or token is missing' });
    return;
  }

  const responseData = await verifyRecaptchaToken(token,ip);
  res.status(200).json(responseData);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000  **1');
});
