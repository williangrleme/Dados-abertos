import pandas as pd
from unidecode import unidecode
import mysql.connector 
from mysql.connector import Error

config = {
        'user': '',
        'password':'',
        'host': '',
        'database': '',
        'auth_plugin':'mysql_native_password'
    }


def main():
    
    excel_file = 'Tabelas/segundaTabela.xlsx'
    
    tabela = pd.read_excel(excel_file)
    tabela.columns = tabela.columns.str.normalize('NFKD').str.encode('ascii', errors='ignore').str.decode('utf-8').str.replace(' ', '_')
    df_autor = tabela[['Tipo_autor', 'Autor']]
    df_beneficiario = tabela[['Cnpj_beneficiario', 'Nome_beneficiario','Uf_beneficiario']]
    df_processo = tabela[['Numero', 'Data_de_cadastro', 'Objeto', 'Justificativa', 'Valor_Solicitado', 'MA', 'Etapa_Atual', 'Autor', 'Cnpj_beneficiario', 'Cod_orgao', 'Cod_uo']]
    df_orgao = tabela [['Cod_orgao','Nome_orgao','Nome_uo','Cod_uo']]
    

    df_autor.columns = df_autor.columns.str.lower().str.strip()
    df_processo.columns = df_processo.columns.str.lower().str.strip()
    df_beneficiario.columns = df_beneficiario.columns.str.lower().str.strip()
    df_orgao.columns = df_orgao.columns.str.lower().str.strip()

    df_autor['autor'] = df_autor['autor'].replace("'", "", regex=True)
    df_beneficiario['nome_beneficiario'] = df_beneficiario['nome_beneficiario'].replace("'", "", regex=True)
    df_beneficiario['nome_beneficiario'] = df_beneficiario['nome_beneficiario'].apply(lambda x: unidecode(x))
   
    
    df_processo['objeto'] = df_processo['objeto'].replace(regex=r'\n|\r', value='')
    df_processo['autor'] = df_processo['autor'].replace("'", "", regex=True)
    df_processo['justificativa'] = df_processo['justificativa'].replace(regex=r'\n|\r', value='')
    df_processo['justificativa'] = df_processo['justificativa'].replace("'", "", regex=True)
    df_processo['justificativa'] = df_processo['justificativa'].apply(lambda x: unidecode(x))
    
    #teste_banco()    
    insercacao_banco_autor(df_autor)
    insercacao_banco_beneficiario(df_beneficiario)
    insercacao_banco_orgao(df_orgao)
    insercao_banco_processo(df_processo)


def ShowInformationDataFrame(df, message=""):
    print(message + "\n")
    print(df.info())
    print(df.describe())
    print(df.head(10))
    print("\n")

def teste_banco():
    try:
        conexao = mysql.connector.connect(**config)
        print("Conexão ao MySQL realizada com sucesso!")
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao MySQL: {erro}")
        

def insercacao_banco_autor(df):

    try:
        conexao = mysql.connector.connect(**config)
        print("Conexão ao MySQL realizada com sucesso!")
        cursor = conexao.cursor()
        colunas = ', '.join(df.columns)
        for _, linha in df.iterrows():
            valores = tuple(linha)
            placeholders = ', '.join(['%s'] * len(linha))
            query_verificacao = f"SELECT COUNT(*) FROM autor WHERE autor = %s"  
            cursor.execute(query_verificacao, (linha['autor'],)) 
            resultado = cursor.fetchone()
            if resultado[0] == 0:  
                query_insercao = f"INSERT INTO autor({colunas}) VALUES ({placeholders})"
                cursor.execute(query_insercao, valores)
            conexao.commit()
        cursor.close()
        print("Dados inseridos com sucesso!")
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao MySQL: {erro}")

def insercacao_banco_beneficiario(df):

    try:
        conexao = mysql.connector.connect(**config)
        print("Conexão ao MySQL realizada com sucesso!")
        cursor = conexao.cursor()
        colunas = ', '.join(df.columns)
        for _, linha in df.iterrows():
            valores = tuple(linha)
            placeholders = ', '.join(['%s'] * len(linha))
            query_verificacao = f"SELECT COUNT(*) FROM beneficiario WHERE cnpj_beneficiario = %s"  
            cursor.execute(query_verificacao, (linha['cnpj_beneficiario'],)) 
            resultado = cursor.fetchone()
            if resultado[0] == 0:  
                query_insercao = f"INSERT INTO beneficiario ({colunas}) VALUES ({placeholders})"
                cursor.execute(query_insercao, valores)
            conexao.commit()
        cursor.close()
        print("Dados inseridos com sucesso!")
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao MySQL: {erro}")

def insercacao_banco_orgao(df):

    try:
        conexao = mysql.connector.connect(**config)
        print("Conexão ao MySQL realizada com sucesso!")
        cursor = conexao.cursor()
        colunas = ', '.join(df.columns)
        for _, linha in df.iterrows():
            valores = tuple(linha)
            placeholders = ', '.join(['%s'] * len(linha))
            query_verificacao = f"SELECT COUNT(*) FROM orgao WHERE cod_orgao = %s AND cod_uo = %s"  
            cursor.execute(query_verificacao, (linha['cod_orgao'], linha['cod_uo'])) 
            resultado = cursor.fetchone()
            if resultado[0] == 0:  
                query_insercao = f"INSERT INTO orgao ({colunas}) VALUES ({placeholders})"
                cursor.execute(query_insercao, valores)
            conexao.commit()
        cursor.close()
        print("Dados inseridos com sucesso!")
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao MySQL: {erro}")

def insercao_banco_processo(df):
    try:
        conexao = mysql.connector.connect(**config)
        print("Conexão ao MySQL realizada com sucesso!")
        cursor = conexao.cursor()
        
        for _, linha in df.iterrows():
            query_verificacao_autor = "SELECT id_autor FROM autor WHERE autor = %s"
            cursor.execute(query_verificacao_autor, (linha['autor'],))
            resultado_autor = cursor.fetchone()

            query_verificacao_beneficiario = "SELECT cnpj_beneficiario FROM beneficiario WHERE cnpj_beneficiario = %s"
            cursor.execute(query_verificacao_beneficiario, (linha['cnpj_beneficiario'],))
            resultado_beneficiario = cursor.fetchone()

            query_verificacao_orgao = "SELECT id_orgao FROM orgao WHERE cod_orgao = %s AND cod_uo = %s"
            cursor.execute(query_verificacao_orgao, (linha['cod_orgao'], linha['cod_uo']))
            resultado_orgao = cursor.fetchone()
            
            if resultado_autor is None:
                print("Autor não encontrado na base de dados")
            else:
                if resultado_beneficiario is None:
                    print("Beneficiario não encontrado na base de dados")
                else:
                    if resultado_orgao is None:
                        print("Orgao e UO nao encontrados")
                    else:
                        id_autor = resultado_autor[0]
                        cnpj_beneficiario = resultado_beneficiario[0]
                        id_orgao = resultado_orgao[0]
                        query_insercao = "INSERT INTO processos (numero, data_de_cadastro, objeto, justificativa, valor_solicitado, ma, etapa_atual, id_autor, cnpj_beneficiario, id_orgao) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                        valores = (
                            linha['numero'], 
                            str(linha['data_de_cadastro']), 
                            linha['objeto'], 
                            linha['justificativa'], 
                            linha['valor_solicitado'], 
                            linha['ma'], 
                            linha['etapa_atual'], 
                            id_autor,
                            cnpj_beneficiario,
                            id_orgao
                        )
                        cursor.execute(query_insercao, valores)

        conexao.commit()
        cursor.close()
        print("Dados inseridos com sucesso!")
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao MySQL: {erro}")
        
if __name__ == "__main__":
    main()
