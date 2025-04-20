# Troubleshooting & Maintenance Guide

## Common Issues

- **Server Down**:  
  - Check service status: `sudo systemctl status apache2`
  - Check logs: `/var/log/apache2/error.log`

- **Database Connection Errors**:
  - Ensure PostgreSQL server is running.
  - Verify database credentials in `.env` file.

- **API Timeout**:
  - Check server CPU usage.
  - Scale up instance if needed.

## Best Practices for Maintenance

- Regularly apply security updates.
- Monitor system logs and metrics.
- Backup database daily.
- Perform load testing quarterly.
- Conduct regular vulnerability scans (OWASP ZAP, Nmap).
