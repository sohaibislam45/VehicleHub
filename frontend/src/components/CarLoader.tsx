import React from 'react';
import './CarLoader.css';

interface CarLoaderProps {
    fullScreen?: boolean;
}

const CarLoader: React.FC<CarLoaderProps> = ({ fullScreen = false }) => {
    const containerClass = fullScreen
        ? "fixed inset-0 z-50 flex items-center justify-center bg-[#121416]/90 backdrop-blur-sm"
        : "flex items-center justify-center";

    return (
        <div className={containerClass}>
            <div className="car-loader-container">
                <div className="car-container">
                    <div className="car"></div>
                    <div className="front-part"></div>
                    <div className="front-part2"></div>
                    <div className="front-part3"></div>
                    <div className="bottom-part"></div>
                    <div className="wheel-container wheel-container1"></div>
                    <div className="wheel-container wheel-container2"></div>
                    <div className="wheel-back"></div>
                    <div className="window"></div>
                    <div className="window2"></div>
                    <div className="window3"></div>
                    <div className="details"></div>
                    <div className="details2"></div>
                    <div className="details3"></div>
                    <div className="details4"></div>
                    <div className="details5"></div>
                    <div className="bumper"></div>
                    <div className="bumper2"></div>
                    <div className="head-lights"></div>
                    <div className="tail-lights"></div>
                    <div className="extra-lighting-details"></div>
                    <div className="extra-lighting-details2"></div>
                    <div className="extra-lighting-details3"></div>
                </div>

                <div className="container-wheel1">
                    <div className="wheel-break"></div>
                    <div className="wheel-ring wheel-ring1">
                        <div className="wheel-center"></div>
                        <div className="wheel-center2"></div>
                        <div className="wheel-ring-stick"></div>
                        <div className="wheel-ring-stick wheel-ring-stick2"></div>
                        <div className="wheel-ring-stick wheel-ring-stick3"></div>
                        <div className="wheel-ring-stick wheel-ring-stick4"></div>
                        <div className="wheel-ring-stick wheel-ring-stick5"></div>
                        <div className="wheel-logo"></div>
                    </div>
                </div>

                <div className="container-wheel2">
                    <div className="wheel-break2"></div>
                    <div className="wheel-ring2 wheel-ring">
                        <div className="wheel-center"></div>
                        <div className="wheel-center2"></div>
                        <div className="wheel-ring-stick"></div>
                        <div className="wheel-ring-stick wheel-ring-stick2"></div>
                        <div className="wheel-ring-stick wheel-ring-stick3"></div>
                        <div className="wheel-ring-stick wheel-ring-stick4"></div>
                        <div className="wheel-ring-stick wheel-ring-stick5"></div>
                        <div className="wheel-logo"></div>
                    </div>
                </div>

                <div className="street">
                    <div className="line"></div>
                    <div className="obstacles"></div>
                </div>
            </div>
        </div>
    );
};

export default CarLoader;
