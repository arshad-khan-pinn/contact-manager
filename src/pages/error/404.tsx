import { Helmet } from '@dr.pogodin/react-helmet';
import NotFoundView from '../../sections/error/not-found-view';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
