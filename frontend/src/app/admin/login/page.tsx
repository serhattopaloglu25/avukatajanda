export default function AdminLogin() {
  return (
    <div style={{padding: '2rem', fontFamily: 'system-ui'}}>
      <h1>Admin Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
