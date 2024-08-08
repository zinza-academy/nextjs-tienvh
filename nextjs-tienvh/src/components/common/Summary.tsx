import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function Summary() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        paddingX: "36px",
        background: "#F7FBFE",
        paddingY: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "#ffffff",
          flexGrow: 1,
          padding: "16px",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Image
          src="/img/ic_register_people_1.png"
          alt="ic_register"
          width={46}
          height={44}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              display: "inline-block",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đối tượng đăng ký tiêm
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ fontSize: 28, fontWeight: "500" }}>
              11,203,873{" "}
            </Typography>
            <Typography
              style={{ fontSize: 13, fontWeight: "500", fontStyle: "italic" }}
            >
              (lượt)
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          height: "auto",
          alignSelf: "stretch",
          backgroundColor: "#EEEEEE",
        }}
      />
      <Box
        sx={{
          display: "flex",
          background: "#ffffff",
          flexGrow: 1,
          padding: "16px",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Image
          src="/img/ic_injection.png"
          alt="ic_injection"
          width={44}
          height={44}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              display: "inline-block",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Số mũi tiêm hôm qua
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ fontSize: 28, fontWeight: "500" }}>
              1,762,119{" "}
            </Typography>
            <Typography
              style={{ fontSize: 13, fontWeight: "500", fontStyle: "italic" }}
            >
              (mũi)
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          height: "auto",
          alignSelf: "stretch",
          backgroundColor: "#EEEEEE",
        }}
      />
      <Box
        sx={{
          display: "flex",
          background: "#ffffff",
          flexGrow: 1,
          padding: "16px",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Image
          src="/img/ic_injected_people.png"
          alt="ic_register"
          width={36}
          height={40}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              display: "inline-block",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Số mũi đã tiêm toàn quốc
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ fontSize: 28, fontWeight: "500" }}>
              69,523,654{" "}
            </Typography>
            <Typography
              style={{ fontSize: 13, fontWeight: "500", fontStyle: "italic" }}
            >
              (mũi)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
