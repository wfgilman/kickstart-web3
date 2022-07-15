import React, { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Default Title' }: Props) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
      </Head>
      <Header />
      {children}
    </Container>
  );
}

export default Layout;
