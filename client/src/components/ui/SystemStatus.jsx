import React, { useState, useEffect } from 'react';
import { Battery, Wifi, MapPin, Zap } from 'lucide-react';

const SystemStatus = () => {
    const [battery, setBattery] = useState({ level: 100, charging: false });
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [location, setLocation] = useState('Location');
    const [locating, setLocating] = useState(false);

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then((batt) => {
                const updateBattery = () => {
                    setBattery({
                        level: Math.round(batt.level * 100),
                        charging: batt.charging
                    });
                };
                updateBattery();
                batt.addEventListener('levelchange', updateBattery);
                batt.addEventListener('chargingchange', updateBattery);
                return () => {
                    batt.removeEventListener('levelchange', updateBattery);
                    batt.removeEventListener('chargingchange', updateBattery);
                };
            });
        }
    }, []);

    const handleLocationClick = () => {
        if (!navigator.geolocation) {
            setLocation('Not Supported');
            return;
        }

        setLocating(true);
        setLocation('Locating...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // FIX: Access coords property
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

                    if (!response.ok) {
                        throw new Error('Location service unavailable');
                    }

                    const data = await response.json();

                    // Extract city, town, village, suburb, or county
                    if (data.address) {
                        const city = data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.suburb ||
                            data.address.county ||
                            'Unknown Location';
                        setLocation(city);
                    } else {
                        setLocation('Location Not Found');
                    }
                } catch (error) {
                    console.error("Error fetching address:", error);
                    setLocation('Location Error');
                } finally {
                    setLocating(false);
                }
            },
            (error) => {
                console.error("Error getting location:", error);
                if (error.code === error.PERMISSION_DENIED) {
                    setLocation('Permission Denied');
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    setLocation('Position Unavailable');
                } else if (error.code === error.TIMEOUT) {
                    setLocation('Timeout');
                } else {
                    setLocation('Location Error');
                }
                setLocating(false);
            }
        );
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md inline-flex">
            {/* Battery */}
            <div className="flex items-center gap-2 text-gray-300 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                {battery.charging ? (
                    <Zap size={14} className="text-yellow-400" />
                ) : (
                    <Battery size={14} className={`${battery.level < 20 ? 'text-red-400' : 'text-green-400'}`} />
                )}
                <span className="text-xs font-mono">{battery.level}%</span>
            </div>

            {/* Network */}
            <div className="flex items-center gap-2 text-gray-300 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                <Wifi size={14} className={isOnline ? 'text-blue-400' : 'text-gray-500'} />
                <span className="text-xs font-medium uppercase">{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Location */}
            <button
                onClick={handleLocationClick}
                disabled={locating || location.includes(',')}
                className="flex items-center gap-2 text-gray-300 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer disabled:cursor-default"
            >
                <MapPin size={14} className={`text-pink-400 ${locating ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{location}</span>
            </button>
        </div>
    );
};

export default SystemStatus;
