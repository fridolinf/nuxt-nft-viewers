export type MoralisResponseData = {
  cursor: number | string | null;
  page: number;
  page_size: number;
  result: MoralisResultData[];
  status: string;
  total: number | string | null;
};

export type MoralisResultData = {
  token_address: string;
  token_id: string;
  amount: string;
  owner_of: string;
  token_hash: string;
  block_number_minted: string;
  block_number: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
  normalized_metadata: MoralisNormalizedMetadata;
  possible_spam: boolean;
};

export type MoralisNormalizedMetadata = {
  name: string;
  description: string;
  animation_url: string | null;
  external_link: string | null;
  image: string;
  attributes: [];
};

export type MoralisMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
  collectionName: string;
};
