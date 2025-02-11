'use client';
import styles from './page.module.css';
import analysedRefundRequests from './analysedRefundRequests';

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <h1>Further Tech Test</h1>
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
