import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
    onVerify: (token: string | null) => void;
}

export interface ReCaptchaRef {
    reset: () => void;
}

export const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(({ onVerify }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [shouldTriggerVerify, setShouldTriggerVerify] = useState(true);
    const isElectron = typeof window !== 'undefined' && !!(window as any).electron;
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const skipInElectron = isElectron && import.meta.env.VITE_ELECTRON_SKIP_RECAPTCHA === 'true';

    useImperativeHandle(ref, () => ({
        reset: () => {
            setShouldTriggerVerify(false);
            recaptchaRef.current?.reset();
            // Restaura o estado após um pequeno delay para garantir que o reset foi concluído
            setTimeout(() => setShouldTriggerVerify(true), 100);
        }
    }));

    const handleChange = (token: string | null) => {
        if (shouldTriggerVerify) {
            onVerify(token);
        }
    };

    // Em ambiente Electron, pulamos o reCAPTCHA e consideramos verificado
    useEffect(() => {
        if (skipInElectron) {
            onVerify('electron-dev');
        }
    }, [skipInElectron, onVerify]);

    if (skipInElectron) {
        return null;
    }

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={handleChange}
            theme="dark"
        />
    );
}); 