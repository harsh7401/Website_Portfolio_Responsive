"use client";

import { useEffect } from "react";

export default function BotpressScripts() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://files.bpcontent.cloud/2026/06/18/16/20260618163539-F2RYSAYV.js";
      script2.async = true;
      document.body.appendChild(script2);
    };
  }, []);

  return null;
}
