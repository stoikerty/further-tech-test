'use client';
import styles from './page.module.css';
import analyseRefundRequests from './analyseRefundRequests';

export default function Home() {
  return (
    <div className={styles.container}>
      <main>Further Tech Test</main>
      <br />
      <div>{analyseRefundRequests.map((request) => JSON.stringify(request))}</div>
    </div>
  );
}
