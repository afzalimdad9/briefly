import { Metadata } from 'next';
import Account from './_components/Account';

export const metadata: Metadata = {
    title: "Account",
};

export default function AccountPage() {
    return (
        <Account />
    )
}