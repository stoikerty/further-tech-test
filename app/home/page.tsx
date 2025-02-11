'use client';
import styles from './page.module.css';
import analysedRefundRequests from './analysedRefundRequests';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <Image src="/logo.webp" alt="logo" width={100} height={30} />
        <h2>Tech Test</h2>
      </header>
      <main className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(analysedRefundRequests[0].originalRequest).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {analysedRefundRequests.map(({ originalRequest, approved }, i) => (
              <tr key={i}>
                {Object.values(originalRequest).map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
                <td className={approved ? styles.approved : styles.rejected}>
                  {approved ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
