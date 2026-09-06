import Button from '../ui/Button.jsx';

export default function PendingButton({ children, ...props }) {
  return (
    <Button
      {...props}
      disabled
      title="Disponível após implementar a integração com a API"
    >
      {children}
    </Button>
  );
}
