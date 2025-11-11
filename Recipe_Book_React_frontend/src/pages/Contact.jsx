import React from "react";
import ProfileCard from "./ProfileCard.jsx";
import Waves from "./Waves";

export default function Contact() {
  return (
    <div style={{ position: "relative", padding: 50, color: "#000000ff" }}>
      {/* Waves Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Waves
          lineColor="#fff"
          backgroundColor="rgba(1, 0, 41, 1)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Profile Cards Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1, // ensures cards stay above waves
        }}
      >
        <ProfileCard
          name="Ved Sanghavi"
          nameStyle={{color: "#000000ff"}}
          title="Ignite CP"
          handle="ved_sanghavi"
          status="Online"
          contactText="T008"
          avatarUrl="/ved3.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Ved clicked")}
        />

        <ProfileCard
          name="Krishna Poriya"
          title="Full-Stack Developer"
          handle="krishna_poriya"
          status="Active"
          contactText="T010"
          avatarUrl="/krishna3.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Krishna clicked")}
        />

        <ProfileCard
          name="Prachi Darji"
          title="Full-Stack Developer"
          handle="prachi_darji"
          status="Busy"
          contactText="T013"
          avatarUrl="/prachi2.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Prachi clicked")}
        />
      </div>
    </div>
  );
}
