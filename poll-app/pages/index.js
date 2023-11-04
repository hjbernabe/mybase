import Link from 'next/link';

function Index() {
  return (
    <div>
      <h1>Velkommen til Poll-appen</h1>
      <ul>
        <li>
          <Link href="/login">
            Logg Inn
          </Link>
        </li>
        <li>
          <Link href="/signup">
            Registrer
          </Link>
        </li>
        {/* Other links go here */}
      </ul>
    </div>
  );
}

export default Index;
