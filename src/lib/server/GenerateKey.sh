echo "Creating keys..."
echo "Creating Private Key and saving it to private.pem"
openssl genrsa > private.pem
echo "Creating Public Key and saving it to public.pem"
openssl rsa -in private.pem -pubout -out public.pem