import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Login from './Login';
import FileUpload from './FileUpload';
import FileList from './FileList';


const router= createBrowserRouter([
{
    path:"/",
    element:<App/>
},
{
    path:"/login",
    element:<Login/>
},
{
    path:"/upload",
    element:<FileUpload/>

},
{
    path:"/list",
    element:<FileList/>
}

])

export default router;