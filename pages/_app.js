
import Layout from "../components/utils/Layout"
import "../styles/global.css"
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) =>{
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp