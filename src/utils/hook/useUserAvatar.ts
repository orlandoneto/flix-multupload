import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useUserDataCache } from './useUserDataCache';

export const useUserAvatar = (fallback: string) => {
    const { getByUserId } = useAuth();
    const cachedUser: User = useUserDataCache();

    const [avatarUser, setAvatarUser] = useState('');

    useEffect(() => {
        let cancelled = false;
        const resolveAvatar = async () => {
            try {
                if (!cachedUser?.id) {
                    if (!cancelled) setAvatarUser(fallback);
                    return;
                }
                const freshUser = await getByUserId(cachedUser.id);
                if (cancelled) return;
                setAvatarUser(freshUser?.photo || fallback);
            } catch {
                if (!cancelled) setAvatarUser(fallback);
            }
        };

        resolveAvatar();
        return () => {
            cancelled = true;
        };
    }, [cachedUser?.id, fallback, getByUserId]);

    return avatarUser;
};
