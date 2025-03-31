// const { GoogleAuth } = require("google-auth-library");
// const path = require("path");

// async function getAccessToken() {
//   try {
//     // Đường dẫn đến file JSON của Service Account
//     const keyFilePath = path.join(__dirname, "\font_end_prj\key\ai-cookwiki-rlis-d61af10e2775.json");

//     // Tạo Google Auth Client
//     const auth = new GoogleAuth({
//       keyFile: keyFilePath,
//       scopes: ["https://www.googleapis.com/oauth2/v1/certs"],
//     });

//     // Lấy token
//     const client = await auth.getClient();
//     const accessToken = await client.getAccessToken();

//     console.log("Access Token:", accessToken.token);
//   } catch (error) {
//     console.error("Error getting access token:", error);
//   }
// }

// // Gọi hàm để lấy token
// getAccessToken();
