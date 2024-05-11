/* tslint:disable */
/* eslint-disable */
/**
*/
export function init_panic_hook(): void;
/**
*/
export enum BooleanEncryptionKeyChoice {
  Big = 0,
  Small = 1,
}
/**
*/
export enum ShortintEncryptionKeyChoice {
  Big = 0,
  Small = 1,
}
/**
*/
export enum ShortintParametersName {
  PARAM_MESSAGE_1_CARRY_0_KS_PBS = 0,
  PARAM_MESSAGE_1_CARRY_1_KS_PBS = 1,
  PARAM_MESSAGE_2_CARRY_0_KS_PBS = 2,
  PARAM_MESSAGE_1_CARRY_2_KS_PBS = 3,
  PARAM_MESSAGE_2_CARRY_1_KS_PBS = 4,
  PARAM_MESSAGE_3_CARRY_0_KS_PBS = 5,
  PARAM_MESSAGE_1_CARRY_3_KS_PBS = 6,
  PARAM_MESSAGE_2_CARRY_2_KS_PBS = 7,
  PARAM_MESSAGE_3_CARRY_1_KS_PBS = 8,
  PARAM_MESSAGE_4_CARRY_0_KS_PBS = 9,
  PARAM_MESSAGE_1_CARRY_4_KS_PBS = 10,
  PARAM_MESSAGE_2_CARRY_3_KS_PBS = 11,
  PARAM_MESSAGE_3_CARRY_2_KS_PBS = 12,
  PARAM_MESSAGE_4_CARRY_1_KS_PBS = 13,
  PARAM_MESSAGE_5_CARRY_0_KS_PBS = 14,
  PARAM_MESSAGE_1_CARRY_5_KS_PBS = 15,
  PARAM_MESSAGE_2_CARRY_4_KS_PBS = 16,
  PARAM_MESSAGE_3_CARRY_3_KS_PBS = 17,
  PARAM_MESSAGE_4_CARRY_2_KS_PBS = 18,
  PARAM_MESSAGE_5_CARRY_1_KS_PBS = 19,
  PARAM_MESSAGE_6_CARRY_0_KS_PBS = 20,
  PARAM_MESSAGE_1_CARRY_6_KS_PBS = 21,
  PARAM_MESSAGE_2_CARRY_5_KS_PBS = 22,
  PARAM_MESSAGE_3_CARRY_4_KS_PBS = 23,
  PARAM_MESSAGE_4_CARRY_3_KS_PBS = 24,
  PARAM_MESSAGE_5_CARRY_2_KS_PBS = 25,
  PARAM_MESSAGE_6_CARRY_1_KS_PBS = 26,
  PARAM_MESSAGE_7_CARRY_0_KS_PBS = 27,
  PARAM_MESSAGE_1_CARRY_7_KS_PBS = 28,
  PARAM_MESSAGE_2_CARRY_6_KS_PBS = 29,
  PARAM_MESSAGE_3_CARRY_5_KS_PBS = 30,
  PARAM_MESSAGE_4_CARRY_4_KS_PBS = 31,
  PARAM_MESSAGE_5_CARRY_3_KS_PBS = 32,
  PARAM_MESSAGE_6_CARRY_2_KS_PBS = 33,
  PARAM_MESSAGE_7_CARRY_1_KS_PBS = 34,
  PARAM_MESSAGE_8_CARRY_0_KS_PBS = 35,
  PARAM_MESSAGE_1_CARRY_1_PBS_KS = 36,
  PARAM_MESSAGE_2_CARRY_2_PBS_KS = 37,
  PARAM_MESSAGE_3_CARRY_3_PBS_KS = 38,
  PARAM_MESSAGE_4_CARRY_4_PBS_KS = 39,
  PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_KS_PBS = 40,
  PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_KS_PBS = 41,
  PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_KS_PBS = 42,
  PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_KS_PBS = 43,
  PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_KS_PBS = 44,
  PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_KS_PBS = 45,
  PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_KS_PBS = 46,
  PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_KS_PBS = 47,
  PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_KS_PBS = 48,
  PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_KS_PBS = 49,
  PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_KS_PBS = 50,
  PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_KS_PBS = 51,
  PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_KS_PBS = 52,
  PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_KS_PBS = 53,
  PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_KS_PBS = 54,
  PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_KS_PBS = 55,
  PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_KS_PBS = 56,
  PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_KS_PBS = 57,
  PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_KS_PBS = 58,
  PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_KS_PBS = 59,
  PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_KS_PBS = 60,
  PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_KS_PBS = 61,
  PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_KS_PBS = 62,
  PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_KS_PBS = 63,
  PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_KS_PBS = 64,
  PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_KS_PBS = 65,
  PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_KS_PBS = 66,
  PARAM_MESSAGE_1_CARRY_1_COMPACT_PK_PBS_KS = 67,
  PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_PBS_KS = 68,
  PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_PBS_KS = 69,
  PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_PBS_KS = 70,
  PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_PBS_KS = 71,
  PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_PBS_KS = 72,
  PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_PBS_KS = 73,
  PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_PBS_KS = 74,
  PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_PBS_KS = 75,
  PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_PBS_KS = 76,
  PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_PBS_KS = 77,
  PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_PBS_KS = 78,
  PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_PBS_KS = 79,
  PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_PBS_KS = 80,
  PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_PBS_KS = 81,
  PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_PBS_KS = 82,
  PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_PBS_KS = 83,
  PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_PBS_KS = 84,
  PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_PBS_KS = 85,
  PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_PBS_KS = 86,
  PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_PBS_KS = 87,
  PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_PBS_KS = 88,
  PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_PBS_KS = 89,
  PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_PBS_KS = 90,
  PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_PBS_KS = 91,
  PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_PBS_KS = 92,
  PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_PBS_KS = 93,
  PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_PBS_KS = 94,
  PARAM_MESSAGE_1_CARRY_0 = 95,
  PARAM_MESSAGE_1_CARRY_1 = 96,
  PARAM_MESSAGE_2_CARRY_0 = 97,
  PARAM_MESSAGE_1_CARRY_2 = 98,
  PARAM_MESSAGE_2_CARRY_1 = 99,
  PARAM_MESSAGE_3_CARRY_0 = 100,
  PARAM_MESSAGE_1_CARRY_3 = 101,
  PARAM_MESSAGE_2_CARRY_2 = 102,
  PARAM_MESSAGE_3_CARRY_1 = 103,
  PARAM_MESSAGE_4_CARRY_0 = 104,
  PARAM_MESSAGE_1_CARRY_4 = 105,
  PARAM_MESSAGE_2_CARRY_3 = 106,
  PARAM_MESSAGE_3_CARRY_2 = 107,
  PARAM_MESSAGE_4_CARRY_1 = 108,
  PARAM_MESSAGE_5_CARRY_0 = 109,
  PARAM_MESSAGE_1_CARRY_5 = 110,
  PARAM_MESSAGE_2_CARRY_4 = 111,
  PARAM_MESSAGE_3_CARRY_3 = 112,
  PARAM_MESSAGE_4_CARRY_2 = 113,
  PARAM_MESSAGE_5_CARRY_1 = 114,
  PARAM_MESSAGE_6_CARRY_0 = 115,
  PARAM_MESSAGE_1_CARRY_6 = 116,
  PARAM_MESSAGE_2_CARRY_5 = 117,
  PARAM_MESSAGE_3_CARRY_4 = 118,
  PARAM_MESSAGE_4_CARRY_3 = 119,
  PARAM_MESSAGE_5_CARRY_2 = 120,
  PARAM_MESSAGE_6_CARRY_1 = 121,
  PARAM_MESSAGE_7_CARRY_0 = 122,
  PARAM_MESSAGE_1_CARRY_7 = 123,
  PARAM_MESSAGE_2_CARRY_6 = 124,
  PARAM_MESSAGE_3_CARRY_5 = 125,
  PARAM_MESSAGE_4_CARRY_4 = 126,
  PARAM_MESSAGE_5_CARRY_3 = 127,
  PARAM_MESSAGE_6_CARRY_2 = 128,
  PARAM_MESSAGE_7_CARRY_1 = 129,
  PARAM_MESSAGE_8_CARRY_0 = 130,
  PARAM_SMALL_MESSAGE_1_CARRY_1 = 131,
  PARAM_SMALL_MESSAGE_2_CARRY_2 = 132,
  PARAM_SMALL_MESSAGE_3_CARRY_3 = 133,
  PARAM_SMALL_MESSAGE_4_CARRY_4 = 134,
}
/**
*/
export enum BooleanParameterSet {
  Default = 0,
  TfheLib = 1,
  DefaultKsPbs = 2,
  TfheLibKsPbs = 3,
}
/**
*/
export class Boolean {
  free(): void;
/**
* @param {number} parameter_choice
* @returns {BooleanParameters}
*/
  static get_parameters(parameter_choice: number): BooleanParameters;
/**
* @param {number} lwe_dimension
* @param {number} glwe_dimension
* @param {number} polynomial_size
* @param {number} lwe_modular_std_dev
* @param {number} glwe_modular_std_dev
* @param {number} pbs_base_log
* @param {number} pbs_level
* @param {number} ks_base_log
* @param {number} ks_level
* @param {BooleanEncryptionKeyChoice} encryption_key_choice
* @returns {BooleanParameters}
*/
  static new_parameters(lwe_dimension: number, glwe_dimension: number, polynomial_size: number, lwe_modular_std_dev: number, glwe_modular_std_dev: number, pbs_base_log: number, pbs_level: number, ks_base_log: number, ks_level: number, encryption_key_choice: BooleanEncryptionKeyChoice): BooleanParameters;
/**
* @param {bigint} seed_high_bytes
* @param {bigint} seed_low_bytes
* @param {BooleanParameters} parameters
* @returns {BooleanClientKey}
*/
  static new_client_key_from_seed_and_parameters(seed_high_bytes: bigint, seed_low_bytes: bigint, parameters: BooleanParameters): BooleanClientKey;
/**
* @param {BooleanParameters} parameters
* @returns {BooleanClientKey}
*/
  static new_client_key(parameters: BooleanParameters): BooleanClientKey;
/**
* @param {BooleanClientKey} client_key
* @returns {BooleanPublicKey}
*/
  static new_public_key(client_key: BooleanClientKey): BooleanPublicKey;
/**
* @param {BooleanClientKey} client_key
* @returns {BooleanCompressedServerKey}
*/
  static new_compressed_server_key(client_key: BooleanClientKey): BooleanCompressedServerKey;
/**
* @param {BooleanClientKey} client_key
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  static encrypt(client_key: BooleanClientKey, message: boolean): BooleanCiphertext;
/**
* @param {BooleanClientKey} client_key
* @param {boolean} message
* @returns {BooleanCompressedCiphertext}
*/
  static encrypt_compressed(client_key: BooleanClientKey, message: boolean): BooleanCompressedCiphertext;
/**
* @param {BooleanCompressedCiphertext} compressed_ciphertext
* @returns {BooleanCiphertext}
*/
  static decompress_ciphertext(compressed_ciphertext: BooleanCompressedCiphertext): BooleanCiphertext;
/**
* @param {BooleanPublicKey} public_key
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  static encrypt_with_public_key(public_key: BooleanPublicKey, message: boolean): BooleanCiphertext;
/**
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  static trivial_encrypt(message: boolean): BooleanCiphertext;
/**
* @param {BooleanClientKey} client_key
* @param {BooleanCiphertext} ct
* @returns {boolean}
*/
  static decrypt(client_key: BooleanClientKey, ct: BooleanCiphertext): boolean;
/**
* @param {BooleanCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_ciphertext(ciphertext: BooleanCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCiphertext}
*/
  static deserialize_ciphertext(buffer: Uint8Array): BooleanCiphertext;
/**
* @param {BooleanCompressedCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_compressed_ciphertext(ciphertext: BooleanCompressedCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCompressedCiphertext}
*/
  static deserialize_compressed_ciphertext(buffer: Uint8Array): BooleanCompressedCiphertext;
/**
* @param {BooleanClientKey} client_key
* @returns {Uint8Array}
*/
  static serialize_client_key(client_key: BooleanClientKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanClientKey}
*/
  static deserialize_client_key(buffer: Uint8Array): BooleanClientKey;
/**
* @param {BooleanPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_public_key(public_key: BooleanPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanPublicKey}
*/
  static deserialize_public_key(buffer: Uint8Array): BooleanPublicKey;
/**
* @param {BooleanCompressedServerKey} server_key
* @returns {Uint8Array}
*/
  static serialize_compressed_server_key(server_key: BooleanCompressedServerKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCompressedServerKey}
*/
  static deserialize_compressed_server_key(buffer: Uint8Array): BooleanCompressedServerKey;
}
/**
*/
export class BooleanCiphertext {
  free(): void;
}
/**
*/
export class BooleanClientKey {
  free(): void;
}
/**
*/
export class BooleanCompressedCiphertext {
  free(): void;
}
/**
*/
export class BooleanCompressedServerKey {
  free(): void;
}
/**
*/
export class BooleanParameters {
  free(): void;
}
/**
*/
export class BooleanPublicKey {
  free(): void;
}
/**
*/
export class CompactFheBool {
  free(): void;
/**
* @param {boolean} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheBool}
*/
  static encrypt_with_compact_public_key(value: boolean, client_key: TfheCompactPublicKey): CompactFheBool;
/**
* @returns {FheBool}
*/
  expand(): FheBool;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheBool}
*/
  static deserialize(buffer: Uint8Array): CompactFheBool;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheBool}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheBool;
}
/**
*/
export class CompactFheBoolList {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheBoolList}
*/
  static deserialize(buffer: Uint8Array): CompactFheBoolList;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheBoolList}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheBoolList;
}
/**
*/
export class CompactFheInt10 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt10}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt10;
/**
* @returns {FheInt10}
*/
  expand(): FheInt10;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt10}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt10;
}
/**
*/
export class CompactFheInt10List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt10List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt10List;
}
/**
*/
export class CompactFheInt12 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt12}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt12;
/**
* @returns {FheInt12}
*/
  expand(): FheInt12;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt12}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt12;
}
/**
*/
export class CompactFheInt128 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt128}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheInt128;
/**
* @returns {FheInt128}
*/
  expand(): FheInt128;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt128}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt128;
}
/**
*/
export class CompactFheInt128List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt128List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheInt128List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt128List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt128List;
}
/**
*/
export class CompactFheInt12List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt12List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt12List;
/**
* @param {Int16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt12List}
*/
  static encrypt_with_compact_public_key(values: Int16Array, public_key: TfheCompactPublicKey): CompactFheInt12List;
}
/**
*/
export class CompactFheInt14 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt14}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt14;
/**
* @returns {FheInt14}
*/
  expand(): FheInt14;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt14}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt14;
}
/**
*/
export class CompactFheInt14List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt14List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt14List;
/**
* @param {Int16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt14List}
*/
  static encrypt_with_compact_public_key(values: Int16Array, public_key: TfheCompactPublicKey): CompactFheInt14List;
}
/**
*/
export class CompactFheInt16 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt16}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt16;
/**
* @returns {FheInt16}
*/
  expand(): FheInt16;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt16}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt16;
}
/**
*/
export class CompactFheInt160 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt160}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheInt160;
/**
* @returns {FheInt160}
*/
  expand(): FheInt160;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt160}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt160;
}
/**
*/
export class CompactFheInt160List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt160List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheInt160List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt160List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt160List;
}
/**
*/
export class CompactFheInt16List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt16List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt16List;
/**
* @param {Int16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt16List}
*/
  static encrypt_with_compact_public_key(values: Int16Array, public_key: TfheCompactPublicKey): CompactFheInt16List;
}
/**
*/
export class CompactFheInt2 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt2}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt2;
/**
* @returns {FheInt2}
*/
  expand(): FheInt2;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt2}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt2;
}
/**
*/
export class CompactFheInt256 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt256}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheInt256;
/**
* @returns {FheInt256}
*/
  expand(): FheInt256;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt256}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt256;
}
/**
*/
export class CompactFheInt256List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt256List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheInt256List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt256List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt256List;
}
/**
*/
export class CompactFheInt2List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt2List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt2List;
/**
* @param {Int8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt2List}
*/
  static encrypt_with_compact_public_key(values: Int8Array, public_key: TfheCompactPublicKey): CompactFheInt2List;
}
/**
*/
export class CompactFheInt32 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt32}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt32;
/**
* @returns {FheInt32}
*/
  expand(): FheInt32;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt32}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt32;
}
/**
*/
export class CompactFheInt32List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt32List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt32List;
/**
* @param {Int32Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt32List}
*/
  static encrypt_with_compact_public_key(values: Int32Array, public_key: TfheCompactPublicKey): CompactFheInt32List;
}
/**
*/
export class CompactFheInt4 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt4}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt4;
/**
* @returns {FheInt4}
*/
  expand(): FheInt4;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt4}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt4;
}
/**
*/
export class CompactFheInt4List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt4List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt4List;
/**
* @param {Int8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt4List}
*/
  static encrypt_with_compact_public_key(values: Int8Array, public_key: TfheCompactPublicKey): CompactFheInt4List;
}
/**
*/
export class CompactFheInt6 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt6}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt6;
/**
* @returns {FheInt6}
*/
  expand(): FheInt6;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt6}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt6;
}
/**
*/
export class CompactFheInt64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt64}
*/
  static encrypt_with_compact_public_key(value: bigint, client_key: TfheCompactPublicKey): CompactFheInt64;
/**
* @returns {FheInt64}
*/
  expand(): FheInt64;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt64}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt64;
}
/**
*/
export class CompactFheInt64List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt64List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt64List;
/**
* @param {BigInt64Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt64List}
*/
  static encrypt_with_compact_public_key(values: BigInt64Array, public_key: TfheCompactPublicKey): CompactFheInt64List;
}
/**
*/
export class CompactFheInt6List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt6List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt6List;
/**
* @param {Int8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt6List}
*/
  static encrypt_with_compact_public_key(values: Int8Array, public_key: TfheCompactPublicKey): CompactFheInt6List;
}
/**
*/
export class CompactFheInt8 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheInt8}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheInt8;
/**
* @returns {FheInt8}
*/
  expand(): FheInt8;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt8}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheInt8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheInt8;
}
/**
*/
export class CompactFheInt8List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheInt8List}
*/
  static deserialize(buffer: Uint8Array): CompactFheInt8List;
/**
* @param {Int8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheInt8List}
*/
  static encrypt_with_compact_public_key(values: Int8Array, public_key: TfheCompactPublicKey): CompactFheInt8List;
}
/**
*/
export class CompactFheUint10 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint10}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint10;
/**
* @returns {FheUint10}
*/
  expand(): FheUint10;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint10}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint10;
}
/**
*/
export class CompactFheUint10List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint10List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint10List;
}
/**
*/
export class CompactFheUint12 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint12}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint12;
/**
* @returns {FheUint12}
*/
  expand(): FheUint12;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint12}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint12;
}
/**
*/
export class CompactFheUint128 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint128}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheUint128;
/**
* @returns {FheUint128}
*/
  expand(): FheUint128;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint128}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint128;
}
/**
*/
export class CompactFheUint128List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint128List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheUint128List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint128List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint128List;
}
/**
*/
export class CompactFheUint12List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint12List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint12List;
/**
* @param {Uint16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint12List}
*/
  static encrypt_with_compact_public_key(values: Uint16Array, public_key: TfheCompactPublicKey): CompactFheUint12List;
}
/**
*/
export class CompactFheUint14 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint14}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint14;
/**
* @returns {FheUint14}
*/
  expand(): FheUint14;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint14}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint14;
}
/**
*/
export class CompactFheUint14List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint14List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint14List;
/**
* @param {Uint16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint14List}
*/
  static encrypt_with_compact_public_key(values: Uint16Array, public_key: TfheCompactPublicKey): CompactFheUint14List;
}
/**
*/
export class CompactFheUint16 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint16}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint16;
/**
* @returns {FheUint16}
*/
  expand(): FheUint16;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint16}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint16;
}
/**
*/
export class CompactFheUint160 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint160}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheUint160;
/**
* @returns {FheUint160}
*/
  expand(): FheUint160;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint160}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint160;
}
/**
*/
export class CompactFheUint160List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint160List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheUint160List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint160List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint160List;
}
/**
*/
export class CompactFheUint16List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint16List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint16List;
/**
* @param {Uint16Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint16List}
*/
  static encrypt_with_compact_public_key(values: Uint16Array, public_key: TfheCompactPublicKey): CompactFheUint16List;
}
/**
*/
export class CompactFheUint2 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint2}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint2;
/**
* @returns {FheUint2}
*/
  expand(): FheUint2;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint2}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint2;
}
/**
*/
export class CompactFheUint256 {
  free(): void;
/**
* @param {any} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint256}
*/
  static encrypt_with_compact_public_key(value: any, client_key: TfheCompactPublicKey): CompactFheUint256;
/**
* @returns {FheUint256}
*/
  expand(): FheUint256;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint256}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint256;
}
/**
*/
export class CompactFheUint256List {
  free(): void;
/**
* @param {any[]} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint256List}
*/
  static encrypt_with_compact_public_key(values: any[], public_key: TfheCompactPublicKey): CompactFheUint256List;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint256List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint256List;
}
/**
*/
export class CompactFheUint2List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint2List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint2List;
/**
* @param {Uint8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint2List}
*/
  static encrypt_with_compact_public_key(values: Uint8Array, public_key: TfheCompactPublicKey): CompactFheUint2List;
}
/**
*/
export class CompactFheUint32 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint32}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint32;
/**
* @returns {FheUint32}
*/
  expand(): FheUint32;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint32}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint32;
}
/**
*/
export class CompactFheUint32List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint32List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint32List;
/**
* @param {Uint32Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint32List}
*/
  static encrypt_with_compact_public_key(values: Uint32Array, public_key: TfheCompactPublicKey): CompactFheUint32List;
}
/**
*/
export class CompactFheUint4 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint4}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint4;
/**
* @returns {FheUint4}
*/
  expand(): FheUint4;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint4}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint4;
}
/**
*/
export class CompactFheUint4List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint4List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint4List;
/**
* @param {Uint8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint4List}
*/
  static encrypt_with_compact_public_key(values: Uint8Array, public_key: TfheCompactPublicKey): CompactFheUint4List;
}
/**
*/
export class CompactFheUint6 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint6}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint6;
/**
* @returns {FheUint6}
*/
  expand(): FheUint6;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint6}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint6;
}
/**
*/
export class CompactFheUint64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint64}
*/
  static encrypt_with_compact_public_key(value: bigint, client_key: TfheCompactPublicKey): CompactFheUint64;
/**
* @returns {FheUint64}
*/
  expand(): FheUint64;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint64}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint64;
}
/**
*/
export class CompactFheUint64List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint64List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint64List;
/**
* @param {BigUint64Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint64List}
*/
  static encrypt_with_compact_public_key(values: BigUint64Array, public_key: TfheCompactPublicKey): CompactFheUint64List;
}
/**
*/
export class CompactFheUint6List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint6List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint6List;
/**
* @param {Uint8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint6List}
*/
  static encrypt_with_compact_public_key(values: Uint8Array, public_key: TfheCompactPublicKey): CompactFheUint6List;
}
/**
*/
export class CompactFheUint8 {
  free(): void;
/**
* @param {number} value
* @param {TfheCompactPublicKey} client_key
* @returns {CompactFheUint8}
*/
  static encrypt_with_compact_public_key(value: number, client_key: TfheCompactPublicKey): CompactFheUint8;
/**
* @returns {FheUint8}
*/
  expand(): FheUint8;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint8}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompactFheUint8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompactFheUint8;
}
/**
*/
export class CompactFheUint8List {
  free(): void;
/**
* @returns {any[]}
*/
  expand(): any[];
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompactFheUint8List}
*/
  static deserialize(buffer: Uint8Array): CompactFheUint8List;
/**
* @param {Uint8Array} values
* @param {TfheCompactPublicKey} public_key
* @returns {CompactFheUint8List}
*/
  static encrypt_with_compact_public_key(values: Uint8Array, public_key: TfheCompactPublicKey): CompactFheUint8List;
}
/**
*/
export class CompressedFheBool {
  free(): void;
/**
* @param {boolean} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheBool}
*/
  static encrypt_with_client_key(value: boolean, client_key: TfheClientKey): CompressedFheBool;
/**
* @returns {FheBool}
*/
  decompress(): FheBool;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheBool}
*/
  static deserialize(buffer: Uint8Array): CompressedFheBool;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheBool}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheBool;
}
/**
*/
export class CompressedFheInt10 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt10}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt10;
/**
* @returns {FheInt10}
*/
  decompress(): FheInt10;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt10}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt10;
}
/**
*/
export class CompressedFheInt12 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt12}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt12;
/**
* @returns {FheInt12}
*/
  decompress(): FheInt12;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt12}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt12;
}
/**
*/
export class CompressedFheInt128 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt128}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheInt128;
/**
* @returns {FheInt128}
*/
  decompress(): FheInt128;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt128}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt128;
}
/**
*/
export class CompressedFheInt14 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt14}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt14;
/**
* @returns {FheInt14}
*/
  decompress(): FheInt14;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt14}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt14;
}
/**
*/
export class CompressedFheInt16 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt16}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt16;
/**
* @returns {FheInt16}
*/
  decompress(): FheInt16;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt16}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt16;
}
/**
*/
export class CompressedFheInt160 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt160}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheInt160;
/**
* @returns {FheInt160}
*/
  decompress(): FheInt160;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt160}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt160;
}
/**
*/
export class CompressedFheInt2 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt2}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt2;
/**
* @returns {FheInt2}
*/
  decompress(): FheInt2;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt2}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt2;
}
/**
*/
export class CompressedFheInt256 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt256}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheInt256;
/**
* @returns {FheInt256}
*/
  decompress(): FheInt256;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt256}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt256;
}
/**
*/
export class CompressedFheInt32 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt32}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt32;
/**
* @returns {FheInt32}
*/
  decompress(): FheInt32;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt32}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt32;
}
/**
*/
export class CompressedFheInt4 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt4}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt4;
/**
* @returns {FheInt4}
*/
  decompress(): FheInt4;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt4}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt4;
}
/**
*/
export class CompressedFheInt6 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt6}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt6;
/**
* @returns {FheInt6}
*/
  decompress(): FheInt6;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt6}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt6;
}
/**
*/
export class CompressedFheInt64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt64}
*/
  static encrypt_with_client_key(value: bigint, client_key: TfheClientKey): CompressedFheInt64;
/**
* @returns {FheInt64}
*/
  decompress(): FheInt64;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt64}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt64;
}
/**
*/
export class CompressedFheInt8 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheInt8}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheInt8;
/**
* @returns {FheInt8}
*/
  decompress(): FheInt8;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheInt8}
*/
  static deserialize(buffer: Uint8Array): CompressedFheInt8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheInt8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheInt8;
}
/**
*/
export class CompressedFheUint10 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint10}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint10;
/**
* @returns {FheUint10}
*/
  decompress(): FheUint10;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint10}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint10;
}
/**
*/
export class CompressedFheUint12 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint12}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint12;
/**
* @returns {FheUint12}
*/
  decompress(): FheUint12;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint12}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint12;
}
/**
*/
export class CompressedFheUint128 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint128}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheUint128;
/**
* @returns {FheUint128}
*/
  decompress(): FheUint128;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint128}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint128;
}
/**
*/
export class CompressedFheUint14 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint14}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint14;
/**
* @returns {FheUint14}
*/
  decompress(): FheUint14;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint14}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint14;
}
/**
*/
export class CompressedFheUint16 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint16}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint16;
/**
* @returns {FheUint16}
*/
  decompress(): FheUint16;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint16}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint16;
}
/**
*/
export class CompressedFheUint160 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint160}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheUint160;
/**
* @returns {FheUint160}
*/
  decompress(): FheUint160;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint160}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint160;
}
/**
*/
export class CompressedFheUint2 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint2}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint2;
/**
* @returns {FheUint2}
*/
  decompress(): FheUint2;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint2}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint2;
}
/**
*/
export class CompressedFheUint256 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint256}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): CompressedFheUint256;
/**
* @returns {FheUint256}
*/
  decompress(): FheUint256;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint256}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint256;
}
/**
*/
export class CompressedFheUint32 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint32}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint32;
/**
* @returns {FheUint32}
*/
  decompress(): FheUint32;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint32}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint32;
}
/**
*/
export class CompressedFheUint4 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint4}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint4;
/**
* @returns {FheUint4}
*/
  decompress(): FheUint4;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint4}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint4;
}
/**
*/
export class CompressedFheUint6 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint6}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint6;
/**
* @returns {FheUint6}
*/
  decompress(): FheUint6;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint6}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint6;
}
/**
*/
export class CompressedFheUint64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint64}
*/
  static encrypt_with_client_key(value: bigint, client_key: TfheClientKey): CompressedFheUint64;
/**
* @returns {FheUint64}
*/
  decompress(): FheUint64;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint64}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint64;
}
/**
*/
export class CompressedFheUint8 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {CompressedFheUint8}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): CompressedFheUint8;
/**
* @returns {FheUint8}
*/
  decompress(): FheUint8;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {CompressedFheUint8}
*/
  static deserialize(buffer: Uint8Array): CompressedFheUint8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {CompressedFheUint8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): CompressedFheUint8;
}
/**
*/
export class FheBool {
  free(): void;
/**
* @param {boolean} value
* @param {TfheClientKey} client_key
* @returns {FheBool}
*/
  static encrypt_with_client_key(value: boolean, client_key: TfheClientKey): FheBool;
/**
* @param {boolean} value
* @param {TfhePublicKey} public_key
* @returns {FheBool}
*/
  static encrypt_with_public_key(value: boolean, public_key: TfhePublicKey): FheBool;
/**
* @param {boolean} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheBool}
*/
  static encrypt_with_compressed_public_key(value: boolean, compressed_public_key: TfheCompressedPublicKey): FheBool;
/**
* @param {boolean} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheBool}
*/
  static encrypt_with_compact_public_key(value: boolean, compact_public_key: TfheCompactPublicKey): FheBool;
/**
* @param {TfheClientKey} client_key
* @returns {boolean}
*/
  decrypt(client_key: TfheClientKey): boolean;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheBool}
*/
  static deserialize(buffer: Uint8Array): FheBool;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheBool}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheBool;
}
/**
*/
export class FheInt10 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt10}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt10;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt10}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt10;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt10}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt10;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt10}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt10;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt10}
*/
  static deserialize(buffer: Uint8Array): FheInt10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt10;
}
/**
*/
export class FheInt12 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt12}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt12;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt12}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt12;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt12}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt12;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt12}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt12;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt12}
*/
  static deserialize(buffer: Uint8Array): FheInt12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt12;
}
/**
*/
export class FheInt128 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheInt128}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheInt128;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheInt128}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheInt128;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt128}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheInt128;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt128}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheInt128;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt128}
*/
  static deserialize(buffer: Uint8Array): FheInt128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt128;
}
/**
*/
export class FheInt14 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt14}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt14;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt14}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt14;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt14}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt14;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt14}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt14;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt14}
*/
  static deserialize(buffer: Uint8Array): FheInt14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt14;
}
/**
*/
export class FheInt16 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt16}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt16;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt16}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt16;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt16}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt16;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt16}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt16;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt16}
*/
  static deserialize(buffer: Uint8Array): FheInt16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt16;
}
/**
*/
export class FheInt160 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheInt160}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheInt160;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheInt160}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheInt160;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt160}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheInt160;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt160}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheInt160;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt160}
*/
  static deserialize(buffer: Uint8Array): FheInt160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt160;
}
/**
*/
export class FheInt2 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt2}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt2;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt2}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt2;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt2}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt2;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt2}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt2;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt2}
*/
  static deserialize(buffer: Uint8Array): FheInt2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt2;
}
/**
*/
export class FheInt256 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheInt256}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheInt256;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheInt256}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheInt256;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt256}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheInt256;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt256}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheInt256;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt256}
*/
  static deserialize(buffer: Uint8Array): FheInt256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt256;
}
/**
*/
export class FheInt32 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt32}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt32;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt32}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt32;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt32}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt32;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt32}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt32;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt32}
*/
  static deserialize(buffer: Uint8Array): FheInt32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt32;
}
/**
*/
export class FheInt4 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt4}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt4;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt4}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt4;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt4}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt4;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt4}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt4;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt4}
*/
  static deserialize(buffer: Uint8Array): FheInt4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt4;
}
/**
*/
export class FheInt6 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt6}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt6;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt6}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt6;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt6}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt6;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt6}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt6;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt6}
*/
  static deserialize(buffer: Uint8Array): FheInt6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt6;
}
/**
*/
export class FheInt64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheClientKey} client_key
* @returns {FheInt64}
*/
  static encrypt_with_client_key(value: bigint, client_key: TfheClientKey): FheInt64;
/**
* @param {bigint} value
* @param {TfhePublicKey} public_key
* @returns {FheInt64}
*/
  static encrypt_with_public_key(value: bigint, public_key: TfhePublicKey): FheInt64;
/**
* @param {bigint} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt64}
*/
  static encrypt_with_compressed_public_key(value: bigint, compressed_public_key: TfheCompressedPublicKey): FheInt64;
/**
* @param {bigint} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt64}
*/
  static encrypt_with_compact_public_key(value: bigint, compact_public_key: TfheCompactPublicKey): FheInt64;
/**
* @param {TfheClientKey} client_key
* @returns {bigint}
*/
  decrypt(client_key: TfheClientKey): bigint;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt64}
*/
  static deserialize(buffer: Uint8Array): FheInt64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt64;
}
/**
*/
export class FheInt8 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheInt8}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheInt8;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheInt8}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheInt8;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheInt8}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheInt8;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheInt8}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheInt8;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheInt8}
*/
  static deserialize(buffer: Uint8Array): FheInt8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheInt8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheInt8;
}
/**
*/
export class FheUint10 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint10}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint10;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint10}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint10;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint10}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint10;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint10}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint10;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint10}
*/
  static deserialize(buffer: Uint8Array): FheUint10;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint10}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint10;
}
/**
*/
export class FheUint12 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint12}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint12;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint12}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint12;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint12}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint12;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint12}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint12;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint12}
*/
  static deserialize(buffer: Uint8Array): FheUint12;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint12}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint12;
}
/**
*/
export class FheUint128 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheUint128}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheUint128;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheUint128}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheUint128;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint128}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheUint128;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint128}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheUint128;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint128}
*/
  static deserialize(buffer: Uint8Array): FheUint128;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint128}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint128;
}
/**
*/
export class FheUint14 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint14}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint14;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint14}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint14;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint14}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint14;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint14}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint14;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint14}
*/
  static deserialize(buffer: Uint8Array): FheUint14;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint14}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint14;
}
/**
*/
export class FheUint16 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint16}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint16;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint16}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint16;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint16}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint16;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint16}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint16;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint16}
*/
  static deserialize(buffer: Uint8Array): FheUint16;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint16}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint16;
}
/**
*/
export class FheUint160 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheUint160}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheUint160;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheUint160}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheUint160;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint160}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheUint160;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint160}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheUint160;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint160}
*/
  static deserialize(buffer: Uint8Array): FheUint160;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint160}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint160;
}
/**
*/
export class FheUint2 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint2}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint2;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint2}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint2;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint2}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint2;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint2}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint2;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint2}
*/
  static deserialize(buffer: Uint8Array): FheUint2;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint2}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint2;
}
/**
*/
export class FheUint256 {
  free(): void;
/**
* @param {any} value
* @param {TfheClientKey} client_key
* @returns {FheUint256}
*/
  static encrypt_with_client_key(value: any, client_key: TfheClientKey): FheUint256;
/**
* @param {any} value
* @param {TfhePublicKey} public_key
* @returns {FheUint256}
*/
  static encrypt_with_public_key(value: any, public_key: TfhePublicKey): FheUint256;
/**
* @param {any} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint256}
*/
  static encrypt_with_compressed_public_key(value: any, compressed_public_key: TfheCompressedPublicKey): FheUint256;
/**
* @param {any} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint256}
*/
  static encrypt_with_compact_public_key(value: any, compact_public_key: TfheCompactPublicKey): FheUint256;
/**
* @param {TfheClientKey} client_key
* @returns {any}
*/
  decrypt(client_key: TfheClientKey): any;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint256}
*/
  static deserialize(buffer: Uint8Array): FheUint256;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint256}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint256;
}
/**
*/
export class FheUint32 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint32}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint32;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint32}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint32;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint32}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint32;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint32}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint32;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint32}
*/
  static deserialize(buffer: Uint8Array): FheUint32;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint32}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint32;
}
/**
*/
export class FheUint4 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint4}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint4;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint4}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint4;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint4}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint4;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint4}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint4;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint4}
*/
  static deserialize(buffer: Uint8Array): FheUint4;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint4}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint4;
}
/**
*/
export class FheUint6 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint6}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint6;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint6}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint6;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint6}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint6;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint6}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint6;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint6}
*/
  static deserialize(buffer: Uint8Array): FheUint6;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint6}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint6;
}
/**
*/
export class FheUint64 {
  free(): void;
/**
* @param {bigint} value
* @param {TfheClientKey} client_key
* @returns {FheUint64}
*/
  static encrypt_with_client_key(value: bigint, client_key: TfheClientKey): FheUint64;
/**
* @param {bigint} value
* @param {TfhePublicKey} public_key
* @returns {FheUint64}
*/
  static encrypt_with_public_key(value: bigint, public_key: TfhePublicKey): FheUint64;
/**
* @param {bigint} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint64}
*/
  static encrypt_with_compressed_public_key(value: bigint, compressed_public_key: TfheCompressedPublicKey): FheUint64;
/**
* @param {bigint} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint64}
*/
  static encrypt_with_compact_public_key(value: bigint, compact_public_key: TfheCompactPublicKey): FheUint64;
/**
* @param {TfheClientKey} client_key
* @returns {bigint}
*/
  decrypt(client_key: TfheClientKey): bigint;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint64}
*/
  static deserialize(buffer: Uint8Array): FheUint64;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint64}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint64;
}
/**
*/
export class FheUint8 {
  free(): void;
/**
* @param {number} value
* @param {TfheClientKey} client_key
* @returns {FheUint8}
*/
  static encrypt_with_client_key(value: number, client_key: TfheClientKey): FheUint8;
/**
* @param {number} value
* @param {TfhePublicKey} public_key
* @returns {FheUint8}
*/
  static encrypt_with_public_key(value: number, public_key: TfhePublicKey): FheUint8;
/**
* @param {number} value
* @param {TfheCompressedPublicKey} compressed_public_key
* @returns {FheUint8}
*/
  static encrypt_with_compressed_public_key(value: number, compressed_public_key: TfheCompressedPublicKey): FheUint8;
/**
* @param {number} value
* @param {TfheCompactPublicKey} compact_public_key
* @returns {FheUint8}
*/
  static encrypt_with_compact_public_key(value: number, compact_public_key: TfheCompactPublicKey): FheUint8;
/**
* @param {TfheClientKey} client_key
* @returns {number}
*/
  decrypt(client_key: TfheClientKey): number;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {FheUint8}
*/
  static deserialize(buffer: Uint8Array): FheUint8;
/**
* @param {bigint} serialized_size_limit
* @returns {Uint8Array}
*/
  safe_serialize(serialized_size_limit: bigint): Uint8Array;
/**
* @param {Uint8Array} buffer
* @param {bigint} serialized_size_limit
* @returns {FheUint8}
*/
  static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FheUint8;
}
/**
*/
export class Shortint {
  free(): void;
/**
* @param {number} message_bits
* @param {number} carry_bits
* @returns {ShortintParameters}
*/
  static get_parameters(message_bits: number, carry_bits: number): ShortintParameters;
/**
* @param {number} message_bits
* @param {number} carry_bits
* @returns {ShortintParameters}
*/
  static get_parameters_small(message_bits: number, carry_bits: number): ShortintParameters;
/**
* @param {number} lwe_dimension
* @param {number} glwe_dimension
* @param {number} polynomial_size
* @param {number} lwe_modular_std_dev
* @param {number} glwe_modular_std_dev
* @param {number} pbs_base_log
* @param {number} pbs_level
* @param {number} ks_base_log
* @param {number} ks_level
* @param {number} message_modulus
* @param {number} carry_modulus
* @param {number} modulus_power_of_2_exponent
* @param {ShortintEncryptionKeyChoice} encryption_key_choice
* @returns {ShortintParameters}
*/
  static new_parameters(lwe_dimension: number, glwe_dimension: number, polynomial_size: number, lwe_modular_std_dev: number, glwe_modular_std_dev: number, pbs_base_log: number, pbs_level: number, ks_base_log: number, ks_level: number, message_modulus: number, carry_modulus: number, modulus_power_of_2_exponent: number, encryption_key_choice: ShortintEncryptionKeyChoice): ShortintParameters;
/**
* @param {bigint} seed_high_bytes
* @param {bigint} seed_low_bytes
* @param {ShortintParameters} parameters
* @returns {ShortintClientKey}
*/
  static new_client_key_from_seed_and_parameters(seed_high_bytes: bigint, seed_low_bytes: bigint, parameters: ShortintParameters): ShortintClientKey;
/**
* @param {ShortintParameters} parameters
* @returns {ShortintClientKey}
*/
  static new_client_key(parameters: ShortintParameters): ShortintClientKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintPublicKey}
*/
  static new_public_key(client_key: ShortintClientKey): ShortintPublicKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintCompressedPublicKey}
*/
  static new_compressed_public_key(client_key: ShortintClientKey): ShortintCompressedPublicKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintCompressedServerKey}
*/
  static new_compressed_server_key(client_key: ShortintClientKey): ShortintCompressedServerKey;
/**
* @param {ShortintClientKey} client_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt(client_key: ShortintClientKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintClientKey} client_key
* @param {bigint} message
* @returns {ShortintCompressedCiphertext}
*/
  static encrypt_compressed(client_key: ShortintClientKey, message: bigint): ShortintCompressedCiphertext;
/**
* @param {ShortintCompressedCiphertext} compressed_ciphertext
* @returns {ShortintCiphertext}
*/
  static decompress_ciphertext(compressed_ciphertext: ShortintCompressedCiphertext): ShortintCiphertext;
/**
* @param {ShortintPublicKey} public_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt_with_public_key(public_key: ShortintPublicKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintCompressedPublicKey} public_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt_with_compressed_public_key(public_key: ShortintCompressedPublicKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintClientKey} client_key
* @param {ShortintCiphertext} ct
* @returns {bigint}
*/
  static decrypt(client_key: ShortintClientKey, ct: ShortintCiphertext): bigint;
/**
* @param {ShortintCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_ciphertext(ciphertext: ShortintCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCiphertext}
*/
  static deserialize_ciphertext(buffer: Uint8Array): ShortintCiphertext;
/**
* @param {ShortintCompressedCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_compressed_ciphertext(ciphertext: ShortintCompressedCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedCiphertext}
*/
  static deserialize_compressed_ciphertext(buffer: Uint8Array): ShortintCompressedCiphertext;
/**
* @param {ShortintClientKey} client_key
* @returns {Uint8Array}
*/
  static serialize_client_key(client_key: ShortintClientKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintClientKey}
*/
  static deserialize_client_key(buffer: Uint8Array): ShortintClientKey;
/**
* @param {ShortintPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_public_key(public_key: ShortintPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintPublicKey}
*/
  static deserialize_public_key(buffer: Uint8Array): ShortintPublicKey;
/**
* @param {ShortintCompressedPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_compressed_public_key(public_key: ShortintCompressedPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedPublicKey}
*/
  static deserialize_compressed_public_key(buffer: Uint8Array): ShortintCompressedPublicKey;
/**
* @param {ShortintCompressedServerKey} server_key
* @returns {Uint8Array}
*/
  static serialize_compressed_server_key(server_key: ShortintCompressedServerKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedServerKey}
*/
  static deserialize_compressed_server_key(buffer: Uint8Array): ShortintCompressedServerKey;
}
/**
*/
export class ShortintCiphertext {
  free(): void;
}
/**
*/
export class ShortintClientKey {
  free(): void;
}
/**
*/
export class ShortintCompressedCiphertext {
  free(): void;
}
/**
*/
export class ShortintCompressedPublicKey {
  free(): void;
}
/**
*/
export class ShortintCompressedServerKey {
  free(): void;
}
/**
*/
export class ShortintParameters {
  free(): void;
/**
* @param {ShortintParametersName} name
*/
  constructor(name: ShortintParametersName);
}
/**
*/
export class ShortintPublicKey {
  free(): void;
}
/**
*/
export class TfheClientKey {
  free(): void;
/**
* @param {TfheConfig} config
* @returns {TfheClientKey}
*/
  static generate(config: TfheConfig): TfheClientKey;
/**
* @param {TfheConfig} config
* @param {any} seed
* @returns {TfheClientKey}
*/
  static generate_with_seed(config: TfheConfig, seed: any): TfheClientKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfheClientKey}
*/
  static deserialize(buffer: Uint8Array): TfheClientKey;
}
/**
*/
export class TfheCompactPublicKey {
  free(): void;
/**
* @param {TfheClientKey} client_key
* @returns {TfheCompactPublicKey}
*/
  static new(client_key: TfheClientKey): TfheCompactPublicKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfheCompactPublicKey}
*/
  static deserialize(buffer: Uint8Array): TfheCompactPublicKey;
}
/**
*/
export class TfheCompressedCompactPublicKey {
  free(): void;
/**
* @param {TfheClientKey} client_key
* @returns {TfheCompressedCompactPublicKey}
*/
  static new(client_key: TfheClientKey): TfheCompressedCompactPublicKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfheCompressedCompactPublicKey}
*/
  static deserialize(buffer: Uint8Array): TfheCompressedCompactPublicKey;
/**
* @returns {TfheCompactPublicKey}
*/
  decompress(): TfheCompactPublicKey;
}
/**
*/
export class TfheCompressedPublicKey {
  free(): void;
/**
* @param {TfheClientKey} client_key
* @returns {TfheCompressedPublicKey}
*/
  static new(client_key: TfheClientKey): TfheCompressedPublicKey;
/**
* @returns {TfhePublicKey}
*/
  decompress(): TfhePublicKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfheCompressedPublicKey}
*/
  static deserialize(buffer: Uint8Array): TfheCompressedPublicKey;
}
/**
*/
export class TfheCompressedServerKey {
  free(): void;
/**
* @param {TfheClientKey} client_key
* @returns {TfheCompressedServerKey}
*/
  static new(client_key: TfheClientKey): TfheCompressedServerKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfheCompressedServerKey}
*/
  static deserialize(buffer: Uint8Array): TfheCompressedServerKey;
}
/**
*/
export class TfheConfig {
  free(): void;
}
/**
*/
export class TfheConfigBuilder {
  free(): void;
/**
* @returns {TfheConfigBuilder}
*/
  static default(): TfheConfigBuilder;
/**
* @returns {TfheConfigBuilder}
*/
  static default_with_small_encryption(): TfheConfigBuilder;
/**
* @returns {TfheConfigBuilder}
*/
  static default_with_big_encryption(): TfheConfigBuilder;
/**
* @param {ShortintParameters} block_parameters
* @returns {TfheConfigBuilder}
*/
  use_custom_parameters(block_parameters: ShortintParameters): TfheConfigBuilder;
/**
* @returns {TfheConfig}
*/
  build(): TfheConfig;
}
/**
*/
export class TfhePublicKey {
  free(): void;
/**
* @param {TfheClientKey} client_key
* @returns {TfhePublicKey}
*/
  static new(client_key: TfheClientKey): TfhePublicKey;
/**
* @returns {Uint8Array}
*/
  serialize(): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {TfhePublicKey}
*/
  static deserialize(buffer: Uint8Array): TfhePublicKey;
}
/**
*/
export class tfhe {
  free(): void;
}
