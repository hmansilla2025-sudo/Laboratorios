export function Switch({ checked }) {
  return (
    <div style={{
      width: '44px',
      height: '24px',
      backgroundColor: checked ? 'green' : 'gray',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      padding: '2px',
      color: 'white',
      fontSize: '10px'
    }}>
      {checked ? "ON" : "OFF"}
    </div>
  );
}
