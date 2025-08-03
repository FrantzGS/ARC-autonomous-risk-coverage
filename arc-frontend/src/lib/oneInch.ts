const BASE_URL = 'https://api.1inch.dev/swap/v5.2/11155111/swap';
const API_KEY = process.env.NEXT_PUBLIC_ONEINCH_API_KEY!;

export async function getSwapQuote({
  fromTokenAddress,
  toTokenAddress,
  amount,
  fromAddress,
  slippage = 1,
}: {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromAddress: string;
  slippage?: number;
}) {
  const url = new URL(BASE_URL);
  url.searchParams.append('fromTokenAddress', fromTokenAddress);
  url.searchParams.append('toTokenAddress', toTokenAddress);
  url.searchParams.append('amount', amount);
  url.searchParams.append('fromAddress', fromAddress);
  url.searchParams.append('slippage', slippage.toString());

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`1inch API error: ${err}`);
  }

  return res.json();
}
