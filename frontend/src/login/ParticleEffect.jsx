import * as React from "react";
import ParticleEffectButton from "react-particle-effect-button";

const ParticleEffect = ({ burst, children }) => (
    <ParticleEffectButton
        color="#00d1b2"
        duration={1500}
        hidden={burst}
    >
        {children}
    </ParticleEffectButton>
);

export default ParticleEffect;
