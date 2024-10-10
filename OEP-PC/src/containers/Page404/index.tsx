import { Button, Result } from 'antd';

/**
* 404
*/
const Page404 = () => {
    <Result
    status="404"
    title="404"
    subTitle="The page is not exist"
    extra={<Button type="primary" href="/">Back to home</Button>}
  />
}

export default Page404;