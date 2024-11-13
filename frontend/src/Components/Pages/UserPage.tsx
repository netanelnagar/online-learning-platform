import { Route, Routes } from 'react-router-dom'
import { User } from '../userArea/User/User'

export default function UserPage() {
    return (
        <Routes>
            <Route path='' element={<User />} />
        </Routes>
    )
}
